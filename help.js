function loadHelp(type) {
  // hide all help blocks
  document.querySelectorAll(".player-help").forEach(el => {
    el.style.display = "none";
  });

  // show selected help
  const help = document.getElementById(`${type}Help`);
  if (!help) {
    console.warn("Help block not found:", `${type}Help`);
    return;
  }

  help.style.display = "block";

  // update active button
  document.querySelectorAll(".help-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  // apply language
  const savedLang = localStorage.getItem("appLanguage");  
  updateHelpLanguage(savedLang);
  
}

function updateHelpLanguage(lang) {  
  document.querySelectorAll(".player-help").forEach(help => {
    help.classList.remove("lang-en", "lang-jp", "lang-kr", "lang-vi");
    help.classList.add(`lang-${lang}`);
  });
}


function updateHelpLanguage2(appLang) {
  const help = document.querySelector(".player-help");
  if (!help) return;

  help.classList.remove("lang-en", "lang-jp", "lang-kr", "lang-vi");
  help.classList.add(`lang-${appLang}`);
}


var lang = window.lang || 'en';
var helpData = null;

function loadHelp(sectionKey) {
  // Update button styles
  document.querySelectorAll('.help-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.help-btn[onclick="loadHelp('${sectionKey}')"]`).classList.add('active');

  // If data is not loaded yet, fetch it first
  if (!helpData) {
    fetch(`https://samkarikalan.github.io/APP/Help/help_${lang}.json`)
      .then(res => res.json())
      .then(data => {
        helpData = data;
        showHelpSection(sectionKey);
      })
      .catch(err => {
        document.getElementById('helpContainer').innerHTML =
          '<p style="color:red;">Help file not available for this language.</p>';
      });
  } else {
    showHelpSection(sectionKey);
  }
}

function showHelpSection(sectionKey) {
  var sectionObj = helpData[sectionKey];
  if (!sectionObj) {
    document.getElementById('helpContainer').innerHTML = '<p>No help found for this section.</p>';
    return;
  }
  var html = '';
  // Loop each topic in the section
  for (var topicKey in sectionObj) {
    var topic = sectionObj[topicKey];
    html += `
      <div class="help-card">
        <h3>${topic.title || ''}</h3>
        ${topic.content ? `<p>${topic.content}</p>` : ''}
        ${topic.list ? `<ul>${topic.list.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
      </div>
    `;
  }
  document.getElementById('helpContainer').innerHTML = html;
}

// Initial load
loadHelp('players');
