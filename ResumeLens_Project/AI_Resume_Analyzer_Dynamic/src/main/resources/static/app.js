const form = document.getElementById('analyzeForm');
const resumeInput = document.getElementById('resume');
const fileLabel = document.getElementById('fileLabel');
const statusBox = document.getElementById('status');
const submitBtn = document.getElementById('submitBtn');

resumeInput.addEventListener('change', () => {
  const file = resumeInput.files[0];
  fileLabel.textContent = file ? file.name : 'Choose a PDF resume';
  statusBox.textContent = '';
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusBox.textContent = '';
  const file = resumeInput.files[0];
  const jobTitle = document.getElementById('jobTitle').value.trim();

  if (!file) { statusBox.textContent = 'Please choose a PDF resume first.'; return; }
  if (!(file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
    statusBox.textContent = 'Please upload a PDF file.'; return;
  }
  if (file.size > 5 * 1024 * 1024) { statusBox.textContent = 'Your PDF must be 5 MB or smaller.'; return; }
  if (!jobTitle) { statusBox.textContent = 'Please enter the target job title.'; return; }

  const body = new FormData();
  body.append('resume', file);
  body.append('jobTitle', jobTitle);
  submitBtn.disabled = true;
  submitBtn.textContent = 'Analyzing…';
  try {
    const response = await fetch('/api/analyze', { method: 'POST', body });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Analysis failed. Please try again.');
    showResults(data);
    statusBox.style.color = '#087f5b';
    statusBox.textContent = 'Analysis complete. Your results are below.';
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    statusBox.style.color = '#b42318';
    statusBox.textContent = error.message || 'Could not connect to the backend. Make sure the Spring Boot app is running.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Analyze my resume <span>→</span>';
  }
});

function showResults(data) {
  document.getElementById('results').classList.remove('hidden');
  document.getElementById('roleBadge').textContent = data.jobTitle;
  document.getElementById('score').textContent = data.score;
  document.querySelector('.score-circle').style.setProperty('--score', `${data.score}%`);
  document.getElementById('disclaimer').textContent = data.note;
  renderChips('matchedSkills', data.matchedSkills, false);
  renderChips('missingSkills', data.missingSkills, true);
  const list = document.getElementById('suggestions');
  list.replaceChildren();
  (data.suggestions || []).forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
  });
}
function renderChips(id, skills, missing) {
  const container = document.getElementById(id);
  container.replaceChildren();
  if (!skills || skills.length === 0) {
    const empty = document.createElement('span');
    empty.className = 'empty';
    empty.textContent = 'No matching skills found yet.';
    container.appendChild(empty);
    return;
  }
  skills.forEach(skill => {
    const chip = document.createElement('span');
    chip.className = missing ? 'chip missing' : 'chip';
    chip.textContent = skill;
    container.appendChild(chip);
  });
}
