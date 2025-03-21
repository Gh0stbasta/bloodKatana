// Swipe-Animation steuern
document.getElementById('swipeVideo').addEventListener('loadeddata', function() {
    // Video abspielen
    this.play();

    // Warten, bis das Video endet
    this.addEventListener('ended', function() {
        // Swipe-Animation ausblenden
        document.getElementById('swipeAnimation').style.display = 'none';
        // Dashboard anzeigen
        document.querySelector('.dashboard-container').classList.add('visible');
    });
});