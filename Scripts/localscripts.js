
  //disable right click to stop annoying popup when panning
  //document.addEventListener('contextmenu', event => event.preventDefault());

  let labelVisibility = true;
  var labels = document.getElementsByClassName("label");
  var model = document.getElementById("model");
  var ARview = document.getElementById("ARview");

  var labelToggle =  document.getElementById("model");

  var body = document.getElementById("body");

  var root = document.documentElement;

  //Required by Switchery - Setup each tickbox - adapted from documentation
  var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
  elems.forEach(function(html) {
    var switchery = new Switchery(html, { color: '#5299D3', jackColor: '#1DD3B0', secondaryColor: '#272727' });
  });

  var changeCheckbox = document.getElementById("labelTick");
  var DSTick = document.getElementById("DSTick");
  var pinnedDS = document.getElementById("DS-card");
  var pinnedCount = 0;
  var currOSP = 99;

  var shownModel = 0 // 0 for heart, 1 for lungs

  var Qnum = 1;

  var parsedQuiz = JSON.parse(Quiz);

  function loadQuiz()
  {
    //alert(parsedQuiz['Question1'][0]['1']);

    quizQuestion = document.getElementById("quizQuestion");
    quizQuestion.innerHTML = parsedQuiz['Question' +Qnum][0]["Question"];

    quizAns1 = document.getElementById("LQ1");
    quizAns1.innerHTML = parsedQuiz['Question' +Qnum][0]["1"];

    quizAns2 = document.getElementById("LQ2");
    quizAns2.innerHTML = parsedQuiz['Question' +Qnum][0]["2"];

    quizAns3 = document.getElementById("LQ3");
    quizAns3.innerHTML = parsedQuiz['Question' +Qnum][0]["3"];
  }

  function submitQuiz()
  {
    quizAns1 = document.getElementById("Q1");
    quizAns2 = document.getElementById("Q2");
    quizAns3 = document.getElementById("Q3");

    answer = parsedQuiz['Question' +Qnum][0]["Answer"];

    result = document.getElementById("result");

    switch(answer){
      case "1":
        if(quizAns1.checked && !quizAns2.checked && !quizAns3.checked)
        {
          result.innerHTML = "Well Done! That is the correct answer"
        }
        else
        {
          result.innerHTML = "Wrong Answer, only the first option is correct"
        }
        break;
      case "2":
        if(!quizAns1.checked && quizAns2.checked && !quizAns3.checked)
        {
          result.innerHTML = "Well Done! That is the correct answer"
        }
        else
        {
          result.innerHTML = "Wrong Answer, only the second option is correct"
        }
        break;
      case "3":
        if(!quizAns1.checked && !quizAns2.checked && quizAns3.checked)
        {
          result.innerHTML = "Well Done! That is the correct answer"
        }
        else
        {
          result.innerHTML = "Wrong Answer, only the third option is correct"
        }
        break;
    }

    Qnum = Qnum + 1;
    if(Qnum > 3)
    {
      Qnum = 1;
    }
    loadQuiz();
  }

  if(!changeCheckbox.checked)
  {
    show();
  }

  changeCheckbox.onchange = function() {
  show();
  };

  DSTick.onchange = function() {
    pinDS();
    
  };

  //No idea why but I cannot read pinnedCount CSS for some reason, this seems like the only way 
  function pinDS()
  {
    if(pinnedCount == 0)
    {
      pinnedCount = 1;
      pinnedDS.style.setProperty('display', 'block');
    }
    else
    {
      pinnedCount = 0;
      pinnedDS.style.setProperty('display', 'none');
    }
  }

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
        root.style.setProperty('--main-size', "140%");
        break;

    }

  }

  function changeModels()
  {
    if(shownModel == 0)
    {

    }
  }



 

  function populate()
  {
    alert(Quiz["Question1"]["Answer"]);
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

  function showModelSim()
  {
    document.getElementById("menu").click();
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

  function loadARModel()
  {

  }

  function animationControl()
  {
    var model = document.getElementById("main");
    var controlButton = document.getElementById("controlButton")
    var OSP = document.getElementById("ObesitySlidePin").value;

    if(pinnedDS.style.display == "block")
    {
      model.src = "Models/Level" + OSP + "/level_" + OSP + "_anim.glb"
      alert("Models/Level" + OSP + "/level_" + OSP + "_anim.glb");
    }

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

  function switchModelMode(id)
  {
    var model = document.getElementById("main");
    if(id == 0)
    {
      model.src = "Models/level_1_to_10_static.glb"
    }
  }

  function scrubberControl(id)
  {
    var model = document.getElementById("main");
    model.currentTime = id;
    model.play();
    model.pause();
  }

  function switchModel(id)
  {
    var model = document.getElementById("main");
    if(id < 10)
    {
      model.src = "Models/Level1/level_1_anim.glb"
    }
    if(id <= 20 && id > 10)
    {
      model.src = "Models/Level2/level_2_anim.glb"
    }
    if(id <= 30 && id > 20)
    {
      model.src = "Models/Level3/level_3_anim.glb"
    }
    if(id <= 40 && id > 30)
    {
      model.src = "Models/Level4/level_4_anim.glb"
    }
    if(id <= 50 && id > 40)
    {
      model.src = "Models/Level5/level_5_anim.glb"
    }
    if(id <= 60 && id > 50)
    {
      model.src = "Models/Level6/level_6_anim.glb"
    }
    if(id <= 70 && id > 60)
    {
      model.src = "Models/Level7/level_7_anim.glb"
    }
    if(id <= 80 && id > 70)
    {
      model.src = "Models/Level8/level_8_anim.glb"
    }
    if(id <= 90 && id > 80)
    {
      model.src = "Models/Level9/level_9_anim.glb"
    }
    if(id <= 100 && id > 90)
    {
      model.src = "Models/Level10/level_10_anim.glb"
    }

    console.log(id);

  }

  showAR();
  loadQuiz();

  //if(!model.canActivateAR)
 // {
   // alert("Error! No AR Support on device");
  //}



