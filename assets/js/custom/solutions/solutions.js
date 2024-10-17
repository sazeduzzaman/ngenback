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

// Select all template checkboxes and add event listeners
document.querySelectorAll('.template-checkbox').forEach((checkbox) => {
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      // Clear previous selections
      document.querySelectorAll('.template-checkbox').forEach(cb => cb.checked = false);
      this.checked = true; // Keep the current checkbox checked

      // Update the preview
      const selectedTemplate = this.value;
      const imgSrc = document.querySelector(`img[alt="Template ${selectedTemplate.charAt(selectedTemplate.length - 1)}"]`).src;
      document.getElementById('template-preview').innerHTML = `<img src="${imgSrc}" alt="Selected Template" style="width: 100%; height: auto;" />`;
    } else {
      // Clear the preview if none are selected
      document.getElementById('template-preview').innerHTML = 'Select a template to preview';
    }
  });
});

// Set Template 1 as the default selection when the page loads
window.addEventListener('DOMContentLoaded', (event) => {
  const defaultCheckbox = document.querySelector('.template-checkbox[value="template1"]');
  defaultCheckbox.checked = true;

  // Trigger the change event to update the preview
  const imgSrc = document.querySelector('img[alt="Template 1"]').src;
  document.getElementById('template-preview').innerHTML = `<img src="${imgSrc}" alt="Selected Template" style="width: 100%; height: auto;" />`;
});



// Function to update checked count for each accordion item
document.addEventListener("DOMContentLoaded", function () {
  // Function to update the selected count for the accordion item
  function updateSelectedCount(accordionItem) {
      const checkboxes = accordionItem.querySelectorAll("input.image-checkbox");
      const count = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
      const countDisplay = accordionItem.querySelector(".checked-count");
      countDisplay.textContent = `(${count} selected)`;
  }

  // Attach event listeners to checkboxes
  document.querySelectorAll(".accordion-item").forEach(accordionItem => {
      const checkboxes = accordionItem.querySelectorAll(".image-checkbox");

      checkboxes.forEach(checkbox => {
          checkbox.addEventListener("change", function() {
              updateSelectedCount(accordionItem);
          });
      });
  });
});