// js/data.js

// Your Google Sheet ID
const SPREADSHEET_ID = "1GVXH4EGWd6MqpYTb8kbTvMRDjzL-B_LwOJAk5Z4BgIs";

// CSV export URLs for each tab
const URL_SCHEDULE = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=576446565`;
const URL_ROSTERS = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=932987042`;
const URL_GOALS = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=374716653`;
const URL_STATS = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=407859760`;

/* ——— TEAM PAGE (Roster Selector) ——— */
if (document.getElementById("roster-select")) {
  const select = document.getElementById("roster-select");
  const container = document.getElementById("team-container");
  let teamsData = {};

  Papa.parse(URL_ROSTERS, {
    download: true,
    header: true,
    complete: ({ data, errors }) => {
      if (errors.length) {
        console.error("Roster CSV parse errors:", errors);
        return;
      }
      // Group rows by Team
      data.forEach((row) => {
        const team = row.Team.trim();
        if (!teamsData[team]) teamsData[team] = [];
        teamsData[team].push({
          name: row.Player,
          number: row.Number,
          position: row.Position,
          bio: row.Bio,
          photo: row.Photo,
        });
      });
      // Initial render
      renderRoster(select.value);
    },
  });

  select.addEventListener("change", () => renderRoster(select.value));

  function renderRoster(teamName) {
    const players = teamsData[teamName] || [];
    container.innerHTML =
      players
        .map(
          (p) => `
      <div class="card">
        <img src="${p.photo}" alt="${p.name}">
        <h3>${p.name}${p.number ? ` (#${p.number})` : ""}</h3>
        ${p.position ? `<p><strong>Position:</strong> ${p.position}</p>` : ""}
        ${p.bio ? `<p>${p.bio}</p>` : ""}
      </div>
    `
        )
        .join("") || "<p>No players found for this roster.</p>";
  }
}

/* ——— SCHEDULE PAGE (Upcoming vs Past Games) ——— */
if (document.getElementById("upcoming-container")) {
  const upcomingContainer = document.getElementById("upcoming-container");
  const pastContainer = document.getElementById("past-container");

  Papa.parse(URL_SCHEDULE, {
    download: true,
    header: true,
    complete: ({ data, errors }) => {
      if (errors.length) {
        console.error("Schedule CSV parse errors:", errors);
        return;
      }
      // Convert Played column to boolean
      data.forEach((r) => {
        r.Played = String(r.Played).toLowerCase() === "true";
      });

      const upcoming = data.filter((r) => !r.Played);
      const past = data.filter((r) => r.Played);

      upcomingContainer.innerHTML =
        upcoming
          .map(
            (m) => `
        <div class="match">
          <h3>${m.HomeTeam} vs ${m.AwayTeam}</h3>
          <p>${m.Date} at ${m.Time}</p>
          <p>Location: ${m.Field}</p>
        </div>
      `
          )
          .join("") || "<p>No upcoming matches.</p>";

      pastContainer.innerHTML =
        past
          .map(
            (m) => `
        <div class="match past">
          <h3>${m.HomeTeam} vs ${m.AwayTeam}</h3>
          <p>${m.Date} – <strong>${m.Result}</strong></p>
          <p>Location: ${m.Field}</p>
        </div>
      `
          )
          .join("") || "<p>No past results.</p>";
    },
  });
}

/* ——— STATS PAGE (Team Stats Table) ——— */
if (document.getElementById("team-stats")) {
  Papa.parse(URL_STATS, {
    download: true,
    header: true,
    complete: ({ data, errors }) => {
      if (errors.length) {
        console.error("Stats CSV parse errors:", errors);
        return;
      }
      const statsArr = data; // array of { Team, GamesPlayed, GoalsFor, ... }

      const container = document.getElementById("team-stats");
      const teams = statsArr.map((r) => r.Team);

      // Build table header
      let html = '<table class="stats-table"><thead><tr><th>Team Stats</th>';
      teams.forEach((team) => (html += `<th>${team}</th>`));
      html += "</tr></thead><tbody>";

      // Define rows in display order
      const rows = [
        { key: "GamesPlayed", label: "Games Played" },
        { key: "GoalsFor", label: "Goals For" },
        { key: "GoalsAgainst", label: "Goals Against" },
        { key: "AvgFor", label: "Avg For" },
        { key: "AvgAgainst", label: "Avg Against" },
        { key: "Win", label: "Win" },
        { key: "Draw", label: "Draw" },
        { key: "Loss", label: "Loss" },
        { key: "Record", label: "Record" },
      ];

      // Populate each row
      rows.forEach((row) => {
        html += `<tr><td>${row.label}</td>`;
        statsArr.forEach((teamObj) => {
          html += `<td>${teamObj[row.key]}</td>`;
        });
        html += "</tr>";
      });

      html += "</tbody></table>";
      container.innerHTML = html;
    },
  });
}

/* ——— STATS PAGE (Top Scorers Goals Table) ——— */
if (document.getElementById("goals-table")) {
  Papa.parse(URL_GOALS, {
    download: true,
    header: true,
    complete: ({ data, errors }) => {
      if (errors.length) {
        console.error("Goals CSV parse errors:", errors);
        return;
      }
      const container = document.getElementById("goals-table");
      let html = `
        <table class="stats-table">
          <thead>
            <tr><th>Team</th><th>Player</th><th>Goals</th></tr>
          </thead>
          <tbody>
      `;
      data.forEach((g) => {
        html += `
          <tr>
            <td>${g.Team}</td>
            <td>${g.Player}</td>
            <td>${g.Goals}</td>
          </tr>
        `;
      });
      html += "</tbody></table>";
      container.innerHTML = html;
    },
  });
}

/* ——— STATS PAGE (Overall Summary) ——— */
if (document.getElementById("overall-summary")) {
  // Load both Stats and Goals, then compute aggregates
  Promise.all([
    // fetch stats as CSV
    new Promise((res) =>
      Papa.parse(URL_STATS, {
        download: true,
        header: true,
        complete: ({ data }) => res(data),
      })
    ),
    // fetch goals as CSV
    new Promise((res) =>
      Papa.parse(URL_GOALS, {
        download: true,
        header: true,
        complete: ({ data }) => res(data),
      })
    ),
  ]).then(([statsArr, goalsArr]) => {
    // aggregate from statsArr
    const games = statsArr.reduce((sum, t) => sum + Number(t.GamesPlayed), 0);
    const wins = statsArr.reduce((sum, t) => sum + Number(t.Win), 0);
    const draws = statsArr.reduce((sum, t) => sum + Number(t.Draw), 0);
    const losses = statsArr.reduce((sum, t) => sum + Number(t.Loss), 0);
    const gf = statsArr.reduce((sum, t) => sum + Number(t.GoalsFor), 0);
    const ga = statsArr.reduce((sum, t) => sum + Number(t.GoalsAgainst), 0);
    const avgFor = (gf / games).toFixed(2);
    const avgAg = (ga / games).toFixed(2);

    // build summary HTML
    let html = '<ul class="overall-summary-list">';
    html += `<li><strong>Games Played:</strong>   ${games}</li>`;
    html += `<li><strong>Wins:</strong>           ${wins}</li>`;
    html += `<li><strong>Draws:</strong>          ${draws}</li>`;
    html += `<li><strong>Losses:</strong>         ${losses}</li>`;
    html += `<li><strong>Goals For:</strong>      ${gf} (Avg ${avgFor})</li>`;
    html += `<li><strong>Goals Against:</strong>  ${ga} (Avg ${avgAg})</li>`;
    html += "</ul>";

    document.getElementById("overall-summary").innerHTML = html;
  });
}
