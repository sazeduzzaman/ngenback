$(".data_table").DataTable({
  language: {
    lengthMenu: "Show _MENU_",
  },
  dom:
    "<'row mb-2'" +
    "<'col-sm-6 d-flex align-items-center justify-conten-start dt-toolbar'l>" +
    "<'col-sm-6 d-flex align-items-center justify-content-end dt-toolbar'f>" +
    ">" +
    "<'table-responsive'tr>" +
    "<'row'" +
    "<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'i>" +
    "<'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>" +
    ">",
});

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  if (draggedElement) {
    const clone = draggedElement.cloneNode(true);
    event.target.appendChild(clone);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  ClassicEditor.create(document.querySelector("#editor")).catch((error) => {
    console.error(error);
  });

  document.querySelectorAll(".image-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const previewContainer = document.getElementById("previewContainer");

      if (
        !checkbox.checked &&
        !document.querySelectorAll(".image-checkbox:checked").length
      ) {
        previewContainer.innerHTML = "";
      } else if (checkbox.checked) {
        const imgSrc = this.getAttribute("data-img-src");
        const imgElement = document.createElement("img");
        imgElement.src = imgSrc;
        imgElement.alt = "Preview Image";
        imgElement.classList.add("preview-image");
        previewContainer.appendChild(imgElement);
      } else {
        const imgSrc = this.getAttribute("data-img-src");
        const imgToRemove = Array.from(
          previewContainer.querySelectorAll("img")
        ).find((img) => img.src.includes(imgSrc));
        if (imgToRemove) {
          previewContainer.removeChild(imgToRemove);
        }
      }
    });
  });
});
