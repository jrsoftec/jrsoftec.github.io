const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const invoiceInputs = [
  document.querySelector("#invoiceQty"),
  document.querySelector("#invoiceRate"),
  document.querySelector("#invoiceTax"),
  document.querySelector("#invoiceDiscount"),
];

function calculateInvoice() {
  const qty = Number(document.querySelector("#invoiceQty").value) || 0;
  const rate = Number(document.querySelector("#invoiceRate").value) || 0;
  const tax = Number(document.querySelector("#invoiceTax").value) || 0;
  const discount = Number(document.querySelector("#invoiceDiscount").value) || 0;
  const subtotal = qty * rate;
  const total = Math.max(0, subtotal + (subtotal * tax) / 100 - discount);

  document.querySelector("#invoiceTotal").textContent = currency.format(total);
}

invoiceInputs.forEach((input) => input.addEventListener("input", calculateInvoice));
calculateInvoice();

document.querySelector("#receiptButton").addEventListener("click", () => {
  const item = document.querySelector("#invoiceItem").value || "Selected item";
  const receiptNo = `RC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  document.querySelector("#receiptNote").textContent = `${receiptNo} generated for ${item}.`;
});

const energyValue = document.querySelector("#energyValue");
const waterValue = document.querySelector("#waterValue");
const tempValue = document.querySelector("#tempValue");

setInterval(() => {
  const energy = 41.5 + Math.random() * 2.4;
  const water = 1230 + Math.round(Math.random() * 95);
  const temp = 26.8 + Math.random() * 1.5;

  energyValue.textContent = `${energy.toFixed(1)} kWh`;
  waterValue.textContent = `${water.toLocaleString("en-IN")} L`;
  tempValue.textContent = `${temp.toFixed(1)} C`;
}, 2600);

document.querySelectorAll(".toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const isOn = button.classList.toggle("is-on");
    button.setAttribute("aria-pressed", String(isOn));
    const label = button.dataset.control;
    document.querySelector("#controlStatus").textContent = `${label} is ${isOn ? "running" : "stopped"}.`;
  });
});

const quiz = [
  {
    question: "Which meter measures electrical consumption?",
    options: ["Energy meter", "Water meter", "Thermometer"],
    answer: "Energy meter",
  },
  {
    question: "Which IoT alert helps reduce water wastage?",
    options: ["Leak detection", "Print receipt", "Question timer"],
    answer: "Leak detection",
  },
  {
    question: "What does an online quiz tool usually calculate instantly?",
    options: ["Student score", "Pump pressure", "Invoice tax only"],
    answer: "Student score",
  },
];

let quizIndex = 0;
let quizScore = 0;
let answered = false;

function renderQuiz() {
  answered = false;
  const current = quiz[quizIndex];
  const optionRoot = document.querySelector("#quizOptions");
  document.querySelector("#quizQuestion").textContent = current.question;
  optionRoot.innerHTML = "";

  current.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      const correct = option === current.answer;
      button.classList.add(correct ? "is-correct" : "is-wrong");
      if (correct) quizScore += 1;
      document.querySelector("#quizScore").textContent = `Score: ${quizScore}`;
    });
    optionRoot.appendChild(button);
  });
}

document.querySelector("#nextQuestion").addEventListener("click", () => {
  quizIndex = (quizIndex + 1) % quiz.length;
  renderQuiz();
});

renderQuiz();

const canvas = document.querySelector("#signalCanvas");
const context = canvas.getContext("2d");

function drawSignalCanvas() {
  const width = canvas.width;
  const height = canvas.height;
  context.clearRect(0, 0, width, height);

  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#e5f4ee");
  gradient.addColorStop(0.55, "#eaf5f8");
  gradient.addColorStop(1, "#f7efe4");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const nodes = [
    [150, 110, "#1d9a71"],
    [570, 155, "#1a8aa2"],
    [385, 255, "#c18421"],
    [210, 395, "#c6534d"],
    [620, 390, "#21344a"],
  ];

  context.lineWidth = 3;
  context.strokeStyle = "rgba(33, 52, 74, 0.22)";
  context.beginPath();
  context.moveTo(nodes[0][0], nodes[0][1]);
  nodes.slice(1).forEach(([x, y]) => context.lineTo(x, y));
  context.stroke();

  nodes.forEach(([x, y, color], index) => {
    context.beginPath();
    context.fillStyle = "rgba(255, 255, 255, 0.78)";
    context.arc(x, y, 52 + index * 3, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, 18, 0, Math.PI * 2);
    context.fill();
  });

  context.fillStyle = "rgba(33, 52, 74, 0.08)";
  for (let i = 0; i < 9; i += 1) {
    context.fillRect(72 + i * 70, 470 - (i % 4) * 25, 38, 8);
  }
}

drawSignalCanvas();
