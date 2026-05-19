// Landing page JS — sign-in flow

function handleSignIn(provider) {
  const card = document.getElementById('auth-card');
  const authBtns = card.querySelector('.auth-buttons');
  const loading = document.getElementById('auth-loading');
  const title = card.querySelector('.auth-title');
  const subtitle = card.querySelector('.auth-subtitle');

  // Show loading
  authBtns.style.display = 'none';
  loading.style.display = 'flex';
  title.textContent = provider === 'linkedin' ? 'Connecting LinkedIn…' : 'Connecting Google…';
  subtitle.textContent = 'Just a moment while we set things up.';

  // Simulate async auth, then redirect to onboarding
  setTimeout(() => {
    window.location.href = 'pages/onboarding.html';
  }, 1800);
}

// Animate feature cards on load
document.addEventListener('DOMContentLoaded', () => {
  // Staggered card entrance already handled by CSS animations
  // Add floating particles to left bg
  const left = document.querySelector('.landing-left');
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      width: ${4 + Math.random() * 4}px;
      height: ${4 + Math.random() * 4}px;
      background: rgba(244,124,72,${0.1 + Math.random() * 0.15});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: float-orb ${6 + Math.random() * 6}s ease-in-out infinite;
      animation-delay: ${Math.random() * 3}s;
      pointer-events: none;
    `;
    left.style.position = 'relative';
    left.appendChild(dot);
  }
});
