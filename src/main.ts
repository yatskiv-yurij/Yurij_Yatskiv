import emailjs from "@emailjs/browser";

const toggleBtn = document.getElementById("menuToggle")!;
const closeBtn = document.getElementById("menuClose")!;
const menu = document.getElementById("menuContainer")!;
const body = document.body;

function openMenu() {
  menu.classList.remove("hidden");
  body.style.overflow = "hidden";
}

function closeMenu() {
  menu.classList.add("hidden");
  body.style.overflow = "";
}

toggleBtn.addEventListener("click", openMenu);

closeBtn.addEventListener("click", closeMenu);

document.querySelectorAll("#menuContainer a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

fetch("https://yatskiv-yurij.github.io/Info/data.json")
  .then((response) => response.json())
  .then((json) => {
    const projects = json.projects;
    console.log(projects);
    const projectsDiv = document.getElementById("projects-items");
    projects.forEach((project: any) => {
      const card = document.createElement("div");
      card.classList.add("border-2", "rounded", "project", "flex", "flex-col");
      card.dataset.category = project.section;

      card.innerHTML = `
      <div class="img-box">
        <img src="./${project.image}" alt="${project.name}" />
      </div>
      <div class="p-2 border-white border-y-1 flex flex-wrap gap-2">
      ${project.technologies
        .map((tech: any) => `<span class="text-sm tech">#${tech}</span>`)
        .join(" ")}
      </div>
      <div class="px-4 py-3">
        <h4 class="py-3 text-2xl font-bold">${project.name}</h4>
        <p class="mb-3">${project.description}</p>
      </div>
      <div class="flex gap-4 px-4 py-3 mt-auto">
        <a
          href="${project.demo}"
          target="_blank"
          class="flex items-center justify-center  gap-2 px-2 py-2 text-white transition border-2 border-purple-400 rounded hover:bg-purple-400 hover:text-black">
          Demo
          <span class="text-xl">&lt;~&gt;</span>
        </a>
        <a
          href="${project.code}"
          target="_blank"
          class="flex items-center justify-center gap-2 px-2 py-2 text-white transition border-2 border-purple-400 rounded hover:bg-purple-400 hover:text-black">
          Code
          <span class="text-xl">&lt;~&gt;</span>
        </a>
      </div>
  `;

      projectsDiv!.appendChild(card);
    });
  })
  .then(() => {
    const buttons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project");
    let activeButton = document.querySelector(".filter-btn.bg-white");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = (button as HTMLElement).dataset.filter;

        // фільтрація
        projects.forEach((project) => {
          project.classList.toggle(
            "hidden",
            !(
              filter === "all" ||
              (project as HTMLElement).dataset.category === filter
            )
          );
        });

        if (activeButton) {
          activeButton.classList.remove("bg-white", "text-black");
          activeButton.classList.add("bg-black", "text-white");
        }
        button.classList.remove("text-white");
        button.classList.add("bg-white", "text-black");

        activeButton = button;
      });
    });
  })
  .catch((error) => console.error("Помилка при завантаженні:", error));

const form = document.getElementById("contact-form") as HTMLFormElement;

if (form) {
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_912gswo",
        "template_di0p5so",
        form,
        "WT2xYyywu_vUEupPa"
      )
      .then(() => {
        alert("✅ Повідомлення успішно відправлено!");
        form.reset();
      })
      .catch((error) => {
        console.error("Помилка:", error);
        alert("❌ Сталася помилка при відправці.");
      });
  });
}
