const questions = [
    [
        "ما الفرق الأساسي بين المراهقة والبلوغ؟",
        [
            "المراهقة مرحلة بيولوجية فقط، والبلوغ مرحلة اجتماعية",
            "البلوغ مرحلة بيولوجية مرتبطة بالنضج الجنسي، أما المراهقة فتشمل تغيرات جسمية ونفسية وعقلية واجتماعية",
            "المراهقة والبلوغ لهما المعنى نفسه",
            "البلوغ يحدث بعد انتهاء مرحلة المراهقة"
        ],
        1,
        "البلوغ يرتبط بالنضج البيولوجي والجنسي، بينما المراهقة مرحلة أوسع تشمل مختلف جوانب نمو الفرد."
    ],
    [
        "أيّ مما يلي يُعدّ من أهم خصائص مرحلة المراهقة؟",
        [
            "الاستقرار الكامل في المشاعر والسلوك",
            "الاعتماد التام على الوالدين في اتخاذ القرارات",
            "البحث عن الاستقلال وبناء الشخصية وتكوين علاقات اجتماعية أكثر انتقائية",
            "توقف النمو العقلي والاجتماعي"
        ],
        2,
        "من خصائص المراهقة بناء الشخصية والبحث عن الاستقلال والانتقال التدريجي نحو ضبط الذات."
    ],
    [
        "ما العوامل التي يمكن أن تؤثر في توقيت البلوغ؟",
        [
            "العوامل الوراثية فقط",
            "التغذية فقط",
            "العوامل البيولوجية والوراثية والتغذوية والصحية والبيئية",
            "المستوى الدراسي فقط"
        ],
        2,
        "يتأثر البلوغ بمجموعة من العوامل المتداخلة، منها الوراثة والتغذية والصحة والظروف البيئية والاجتماعية."
    ],
    [
        "ما الذي يميز مرحلة المراهقة المتأخرة؟",
        [
            "بداية ظهور التغيرات الجسمية السريعة",
            "زيادة النضج النسبي والقدرة على تحديد الأهداف وتحمل المسؤولية والاستقلال",
            "الاعتماد الكامل على الأصدقاء في اتخاذ القرارات",
            "بداية الانتقال من الطفولة إلى المراهقة"
        ],
        1,
        "تمثل المراهقة المتأخرة مرحلة الاقتراب من الرشد، حيث يزداد النضج وتتطور القدرة على الاستقلال وتحمل المسؤولية."
    ],
    [
        "أيّ من الخيارات التالية يمثل أسلوبًا مناسبًا للوقاية من جنوح المراهقين؟",
        [
            "استخدام القسوة والعقاب المستمر",
            "منع المراهق من تكوين العلاقات الاجتماعية",
            "توفير الحوار والثقة والرعاية، مع التعاون بين الأسرة والمدرسة والإرشاد النفسي",
            "تجاهل المشكلات السلوكية حتى تختفي تلقائيًا"
        ],
        2,
        "تساعد التربية السليمة والحوار والثقة والإرشاد النفسي والتعاون بين الأسرة والمدرسة على الوقاية من الجنوح."
    ]
];

let current = 0, score = 0, locked = false;

const $ = id => document.getElementById(id);

function show(id) {
    ["home-screen", "quiz-screen", "result-screen"].forEach(x =>
        $(x).classList.add("hidden")
    );
    $(id).classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
    current = 0;
    score = 0;
    show("quiz-screen");
    render();
}

function render() {
    locked = false;
    const q = questions[current];

    $("current-number").textContent = current + 1;
    $("total-number").textContent = questions.length;
    $("progress-fill").style.width =
        (current / questions.length * 100) + "%";

    $("question-text").textContent = q[0];
    $("feedback").className = "feedback hidden";
    $("next-button").classList.add("hidden");

    const wrap = $("answers");
    wrap.innerHTML = "";

    const letters = ["أ", "ب", "ج", "د"];

    q[1].forEach((answer, i) => {
        const b = document.createElement("button");
        b.className = "answer-option";
        b.type = "button";
        b.innerHTML =
            `<span class="answer-letter">${letters[i]}</span><span>${answer}</span>`;

        b.onclick = () => choose(i);
        wrap.appendChild(b);
    });
}

function choose(i) {
    if (locked) return;

    locked = true;

    const q = questions[current];
    const buttons = [...document.querySelectorAll(".answer-option")];

    buttons.forEach((b, j) => {
        b.disabled = true;

        if (j === q[2]) {
            b.classList.add("correct");
        } else if (j === i) {
            b.classList.add("wrong");
        }
    });

    const f = $("feedback");

    if (i === q[2]) {
        score++;
        f.textContent = "إجابة صحيحة! " + q[3];
        f.className = "feedback good";
    } else {
        f.textContent = "إجابة غير صحيحة. " + q[3];
        f.className = "feedback bad";
    }

    $("next-button").textContent =
        current === questions.length - 1
            ? "عرض النتيجة"
            : "السؤال التالي";

    $("next-button").classList.remove("hidden");
}

function finish() {
    show("result-screen");

    $("score-value").textContent = score;
    $("score-total").textContent = "/ " + questions.length;

    $("result-title").textContent =
        score === questions.length
            ? "ممتاز!"
            : score >= 4
                ? "أحسنت!"
                : "واصل المراجعة!";

    $("result-message").textContent =
        score === questions.length
            ? "أجبت عن جميع الأسئلة بشكل صحيح!"
            : score >= 4
                ? "نتيجة جيدة جدًا. راجع الأسئلة التي أخطأت فيها."
                : "راجع محاور الفصل وحاول مرة أخرى.";
}

$("start-button").onclick = startQuiz;

$("next-button").onclick = () => {
    if (current < questions.length - 1) {
        current++;
        render();
    } else {
        finish();
    }
};

$("restart-button").onclick = startQuiz;

$("home-button").onclick = () => show("home-screen");

$("result-home-button").onclick = () => show("home-screen");