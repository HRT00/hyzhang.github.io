(function () {
  const data = window.siteData;
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    root.dataset.theme = savedTheme;
  }

  document.title = data.name;
  document.querySelector('meta[name="description"]').setAttribute(
    "content",
    `Academic homepage of ${data.name}.`
  );

  document.querySelectorAll("[data-field]").forEach((node) => {
    const key = node.getAttribute("data-field");
    if (data[key]) node.textContent = data[key];
  });

  const previousAffiliation = document.getElementById("previous-affiliation");
  if (previousAffiliation && data.previousAffiliation) {
    previousAffiliation.textContent = `Previous: ${data.previousAffiliation}`;
    previousAffiliation.hidden = false;
  }

  const portraitImage = document.getElementById("portrait-image");
  const portraitFallback = document.querySelector(".portrait span");
  if (portraitImage && data.avatarImage) {
    portraitImage.src = data.avatarImage;
    portraitImage.alt = `Portrait of ${data.name}`;
    portraitImage.addEventListener("load", () => {
      if (portraitFallback) portraitFallback.style.display = "none";
    });
    portraitImage.addEventListener("error", () => {
      if (portraitFallback) portraitFallback.style.display = "";
    });
  }

  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const interests = document.getElementById("interests");
  data.interests.forEach((item) => interests.appendChild(make("span", "chip", item)));

  const links = document.getElementById("links");
  data.links.forEach((item) => {
    const link = make("a", "", item.label);
    link.href = item.href;
    links.appendChild(link);
  });

  const about = document.getElementById("about-content");
  data.about.forEach((text) => about.appendChild(make("p", "", text)));

  function renderPublication(pub) {
    const article = make("article", "publication");
    const title = make("h3", "", pub.title);
    const authors = make("p", "meta", pub.authors);
    const venue = make("p", "meta venue", `${pub.venue} | ${pub.year}`);
    const description = make("p", "description", pub.description);

    article.append(title, authors, venue, description);
    return article;
  }

  const selected = document.getElementById("selected-publications");
  data.publications
    .filter((pub) => pub.selected)
    .forEach((pub) => selected.appendChild(renderPublication(pub)));

  const allPublications = document.getElementById("all-publications-list");
  function renderAllPublications(filter = "all") {
    allPublications.innerHTML = "";
    data.publications
      .filter((pub) => filter === "all" || pub.type === filter)
      .forEach((pub) => allPublications.appendChild(renderPublication(pub)));
  }
  renderAllPublications();

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderAllPublications(button.dataset.filter);
    });
  });

  const projects = document.getElementById("projects-list");
  data.projects.forEach((project) => {
    const card = make("article", "project");
    const title = make("h3", "", project.name);
    const tags = make("div", "tag-row");
    project.tags.forEach((tag) => tags.appendChild(make("span", "tag", tag)));
    const text = make("p", "", project.text);
    card.append(title, tags, text);
    projects.appendChild(card);
  });

  const news = document.getElementById("news-list");
  data.news.forEach((item) => {
    const row = make("div", "news-item");
    row.append(make("div", "news-date", item.date), make("div", "news-text", item.text));
    news.appendChild(row);
  });

  const service = document.getElementById("service-list");
  data.service.forEach((item) => service.appendChild(make("li", "", item)));

  const cv = document.getElementById("cv-list");
  data.cv.forEach((item) => {
    const row = make("article", "cv-item");
    row.append(make("h3", "", item.label), make("p", "", item.text));
    cv.appendChild(row);
  });

  document.querySelector(".theme-toggle").addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "" : "dark";
    if (next) {
      root.dataset.theme = next;
      localStorage.setItem("theme", next);
    } else {
      delete root.dataset.theme;
      localStorage.removeItem("theme");
    }
  });
})();
