function setDisplay(sourceId, targetId) {
    sourceId.forEach(source => {
        const sourceEle = document.getElementById(source);
        sourceEle.style.display = 'none';
    })
    const targetEle = document.getElementById(targetId);
    targetEle.style.display = 'block';
}

function openPopup() {
    document.getElementById("popupContainer").style.display = "block";
}

function closePopup() {
    document.getElementById("popupContainer").style.display = "none";
}