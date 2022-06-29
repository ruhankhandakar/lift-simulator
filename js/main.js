class Building {
  constructor() {
    this.building = document.querySelector(".building");
  }

  createNumberBoard(floorNumber) {
    const totalFloor = new Array(floorNumber - 1).fill(1);

    return totalFloor
      .map(
        (_, floor) =>
          `<div class="numbers" data-floor="${floor + 1}">${floor + 1}</div>`
      )
      .join("");
  }

  createController(floorNumber, numberOfFloors) {
    return `
        <div class="controller">
            <div class="call">
                <button data-floor="${floorNumber}">Press</button>
            </div>
            <div class="number-board">
                ${this.createNumberBoard(numberOfFloors)}
                <div class="numbers" data-floor="0">G</div>
                <div class="numbers" data-floor="-1">B1</div>
            </div>
        </div>
    `;
  }

  createLiftElement(floorNumber, numberOfFloors, isLeftSide) {
    const lift = `
            <div class="lift-main-container">
                ${
                  !isLeftSide
                    ? this.createController(floorNumber, numberOfFloors)
                    : ""
                }
                <div class="lift-container">
                    <div class="left-door"></div>
                    <div class="right-door"></div>
                </div>
                ${
                  isLeftSide
                    ? this.createController(floorNumber, numberOfFloors)
                    : ""
                }
            </div>
        `;
    return lift;
  }
  createFloor(numberOfFloors) {
    const totalFloors = new Array(numberOfFloors + 1).fill(1);

    const fragment = document.createDocumentFragment();

    totalFloors.forEach((_, floor) => {
      const floorNumber = numberOfFloors - (floor + 1);

      const floorDiv = document.createElement("div");
      floorDiv.setAttribute("class", "floor");
      floorDiv.innerHTML = `
            <!-- Left Lift -->
            ${this.createLiftElement(floorNumber, numberOfFloors, true)}

            <div class="floor-num-container">
                <div class="floor-num">${
                  floorNumber === -1
                    ? "B1"
                    : floorNumber === 0
                    ? "G"
                    : floorNumber
                }</div>
            </div>

            <!-- right lift -->
            ${this.createLiftElement(floorNumber, numberOfFloors)}
        `;
      fragment.appendChild(floorDiv);
    });

    this.building.appendChild(fragment);
  }
}

class Lift extends Building {
  constructor() {
    super();

    this.numOfFloors = 4;
    this.leftLiftPos = 0;
    this.rightLiftPos = 0;
    this.leftLiftControls = -1;
    this.rightLiftControls = -1;
    this.currentPos = null;
  }

  handleFunctionality(event) {
    console.log(this);
    console.log(event);
  }

  init() {
    this.createFloor(this.numOfFloors);
    this.building.addEventListener("click", (e) => {
      this.handleFunctionality(e);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const lift = new Lift();
  lift.init();
});
