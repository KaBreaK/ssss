var aktualnaWielkosc = 16
document.getElementById('yesBtn').addEventListener('click', function () {

    var containers = document.querySelectorAll('.container');
    containers.forEach(function (container, index) {
        setTimeout(function () {
            container.style.animation = 'appearance 0.5s ease forwards';
            container.classList.remove("hidden")
            document.getElementById('sss').classList.add('hidden');
            let abc = container.id
        }, index * 200);
    });
});
document.getElementById('noBtn').addEventListener('click', function () {
    document.getElementById('gifContainer').classList.remove('hidden');
    document.getElementById('sss').classList.add('hidden');
});
document.getElementById('yesBtn2').addEventListener('click', function () {
    document.getElementById('capcha').classList.remove('hidden');
    document.getElementById('gifContainer').classList.add('hidden');
});

document.getElementById('noBtn2').addEventListener('click', function () {
    document.getElementById('gifContainer').classList.add('hidden');
    document.getElementById('sss').classList.remove('hidden');
});
document.getElementById('btncapcha').addEventListener('click', function () {
    console.log("ssssssssssssss")
    var wpisanyTekst = document.getElementById("tekst").value;
    if (wpisanyTekst === "Jestem zjebana") {
        document.getElementById('capcha').classList.add('hidden');
        document.getElementById('away').classList.remove('hidden');
        console.log("")
    } else {
        console.log("ssssss")
        document.getElementById("bad").innerHTML = "źle"
        aktualnaWielkosc += 5;
        document.getElementById("bad").style.fontSize = aktualnaWielkosc + "px";
    }
});

var klikniecia = 0;

document.getElementById("yesBtn3").addEventListener("click", function() {
    klikniecia++;

    if (klikniecia <= 5) {
        var noweMiejsce = document.createElement("div");
        noweMiejsce.style.marginTop = (Math.random() * 500) + "px";
        noweMiejsce.style.marginLeft = (Math.random() * 500) + "px";
        noweMiejsce.appendChild(document.getElementById("yesBtn3"));
        document.body.appendChild(noweMiejsce);
    } else {
        document.getElementById('last').classList.remove('hidden');
        document.getElementById('away').classList.add('hidden');
        document.getElementById("yesBtn3").style.display = "none";
    }
});
document.getElementById('noBtn3').addEventListener('click', function () {
    document.getElementById('last').classList.remove('hidden');
    document.getElementById('away').classList.add('hidden');
    document.getElementById("yesBtn3").style.display = "none";
});

document.getElementById('yesBtn4').addEventListener('click', function () {
    document.getElementById('last').classList.add('hidden');
    document.getElementById('sss').classList.remove('hidden');
});
a = 0
document.getElementById('noBtn4').addEventListener('click', function () {
    console.log("ssssssssssssss")
    if (a >= 6) {
        document.getElementById('last').classList.add('hidden');
        document.getElementById('responseContainer').classList.remove('hidden');
        console.log("dfdddddddd")
    } else {
        aktualnaWielkosc += 50;
        document.getElementById("yesBtn4").style.fontSize = aktualnaWielkosc + "px";
    }
    a++
});




const sectors = [
    { color: '#f82', label: 'KEBAB' },
    { color: '#0bf', label: 'KEBAB' },
    { color: '#fb0', label: 'KEBAB' },
    { color: '#0fb', label: 'KEBAB' },
    { color: '#b0f', label: 'KEBAB' },
    { color: '#f0b', label: 'INNE' },
]

const rand = (m, M) => Math.random() * (M - m) + m
const tot = sectors.length
const spinEl = document.querySelector('#spin')
const ctx = document.querySelector('#wheel').getContext('2d')
const dia = ctx.canvas.width
const rad = dia / 2
const PI = Math.PI
const TAU = 2 * PI
const arc = TAU / sectors.length

const friction = 0.991 // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0 // Angular velocity
let ang = 0 // Angle in radians

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot

function drawSector(sector, i) {
    const ang = arc * i
    ctx.save()
    // COLOR
    ctx.beginPath()
    ctx.fillStyle = sector.color
    ctx.moveTo(rad, rad)
    ctx.arc(rad, rad, rad, ang, ang + arc)
    ctx.lineTo(rad, rad)
    ctx.fill()
    // TEXT
    ctx.translate(rad, rad)
    ctx.rotate(ang + arc / 2)
    ctx.textAlign = 'right'
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 30px sans-serif'
    ctx.fillText(sector.label, rad - 10, 10)
    //
    ctx.restore()
}

function rotate() {
    const sector = sectors[getIndex()]
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
    spinEl.textContent = !angVel ? 'SPIN' : sector.label
    spinEl.style.background = sector.color
}

function frame() {
    if (!angVel) return
    angVel *= friction // Decrement velocity by friction
    if (angVel < 0.002) angVel = 0 // Bring to stop
    ang += angVel // Update angle
    ang %= TAU // Normalize angle
    rotate()
}

function engine() {
    frame()
    requestAnimationFrame(engine)
}

function init() {
    sectors.forEach(drawSector)
    rotate() // Initial rotation
    engine() // Start engine
    spinEl.addEventListener('click', () => {
        if (!angVel) angVel = rand(0.25, 0.45)
    })
}

init()