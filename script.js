document.getElementById('uploadBox').addEventListener('click',()=>document.getElementById('insp').click());
  document.getElementById('insp').addEventListener('change',e=>{
    const f=e.target.files[0];
    document.getElementById('fileName').textContent = f ? f.name : '';
  });
  document.getElementById('inquiryForm').addEventListener('submit',e=>{
    e.preventDefault();
    const edate = document.getElementById('edate').value;
    const guests = document.getElementById('guests').value;
    const reqs = document.getElementById('reqs').value.trim();
    const hasImage = document.getElementById('insp').files.length > 0;
    let msg = "Hi Baker's Delight, I'd like to enquire about a custom cake.";
    if(edate) msg += `\nEvent date: ${edate}`;
    if(guests) msg += `\nGuest count: ${guests}`;
    if(reqs) msg += `\nSpecial requirements: ${reqs}`;
    if(hasImage) msg += "\n(I have an inspiration photo to share here.)";
    document.getElementById('formStatus').style.display='block';
    window.open('https://wa.me/917339387556?text=' + encodeURIComponent(msg), '_blank');
  });

  // Subtle hero parallax
  const heroPhoto = document.querySelector('.hero-photo');
  if(heroPhoto){
    window.addEventListener('scroll',()=>{
      const y = window.scrollY;
      heroPhoto.style.transform = 'translateY(' + Math.min(y*0.08,32) + 'px)';
    },{passive:true});
  }

  // Gentle scroll-reveal for section content
  const revealTargets = document.querySelectorAll('.section-head, .celeb-card, .gcard, .testi, .trust-statement, .insta-item, .testi-cta, .trust-strip-inner, .cta-section-inner');
  revealTargets.forEach(el=>el.classList.add('reveal'));
  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  revealTargets.forEach(el=>io.observe(el));
