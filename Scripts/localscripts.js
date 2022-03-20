
  //disable right click to stop annoying popup when panning
  //document.addEventListener('contextmenu', event => event.preventDefault());

  let labelVisibility = true;
  var labels = document.getElementsByClassName("label");
  var model = document.getElementById("model");
  var ARview = document.getElementById("ARview");

  var labelToggle =  document.getElementById("model");

  var body = document.getElementById("body");

  var root = document.documentElement;

  //Required by Switchery - Setup each tickbox
  var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
  elems.forEach(function(html) {
    var switchery = new Switchery(html, { color: '#5299D3', jackColor: '#1DD3B0', secondaryColor: '#272727' });
  });

  var changeCheckbox = document.getElementById("labelTick");

  if(!changeCheckbox.checked)
  {
    show();
  }

  changeCheckbox.onchange = function() {
  show();
  };

  function changeAccess(id)
  {
    switch(id) {
      case '0':
        root.style.setProperty('--main-font', "Lexend");
        root.style.setProperty('--main-spac', "auto");
        root.style.setProperty('--main-line-height', "auto");
        break;
      case '1':
        root.style.setProperty('--main-font', "Open-Dyslexia");
        root.style.setProperty('--main-spac', "250%");
        root.style.setProperty('--main-line-height', "200%");
        break;
      case '2':
        root.style.setProperty('--main-font', "Times New Roman");
        root.style.setProperty('--main-spac', "auto");
        root.style.setProperty('--main-line-height', "auto");
        break;
      case '3':
        root.style.setProperty('--main-size', "70%");
        break;
      case '4':
        root.style.setProperty('--main-size', "100%");
        break;
      case '5':
        root.style.setProperty('--main-size', "180%");
        break;

    }

  }

  function show()
  {
    var tickBox = document.getElementById('labelTick');
    
    if(labelVisibility == true && tickBox.checked == 0)
    {
      for(var i = 0; i < labels.length; i++)
      {
        labels[i].style.display = "none";
      }
      labelVisibility = false;
      
    }
    else
    {
      for(var i = 0; i < labels.length; i++)
      {
        labels[i].style.display = "block";
      }
      labelVisibility = true;
      
    }
  }

  function showModel()
  {
    if (model.style.display === "none" && ARview.style.display == "none") 
    {
      model.style.display = "block";
    } 
    else 
    {
      model.style.display = "none";
    }
  }

  function showAR()
  {
    if (ARview.style.display === "none") 
    {
      ARview.style.display = "block";
      model.style.display = "none";
    } 
    else 
    {
      ARview.style.display = "none";
      model.style.display = "block";
    }
  }

  function animationControl()
  {
    var model = document.getElementById("main");
    var controlButton = document.getElementById("controlButton")

    if(model.paused == true)
    {
      model.play();
      controlButton.classList.remove('bi-play');
      controlButton.classList.add('bi-pause');
    }
    else
    {
      model.pause();
      controlButton.classList.remove('bi-pause');
      controlButton.classList.add('bi-play');
    }
  }

  function switchModel(id)
  {
    var model = document.getElementById("main");
    if(id <= 50)
    {
      model.src = "../Models/Normal_heart_anim.glb"
    }
    if(id > 50)
    {
      model.src = "../Models/Obese_heart_anim_final.glb"
    }
  }

  showAR();




