function openUploadPopup() {
    document.getElementById("showPopup").style.visibility = "visible";
    document.getElementById("showPopup").style.opacity = "1";
}

function closeUploadPopup() {
    document.getElementById("showPopup").style.visibility = "hidden";
    document.getElementById("showPopup").style.opacity = "0";
}

document.getElementById('logoutButton').onclick = function() {
    window.location.href = '/logout';
};
