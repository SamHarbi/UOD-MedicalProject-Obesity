
  //disable right click to stop annoying popup when panning
  //document.addEventListener('contextmenu', event => event.preventDefault());

  let labelVisibility = true;
  var labels = document.getElementsByClassName("label");
  var model = document.getElementById("model");

  var labelToggle =  document.getElementById("model");



  //Required by Switchery - Setup each tickbox
  var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
  elems.forEach(function(html) {
    var switchery = new Switchery(html, { color: '#5299D3', jackColor: '#1DD3B0', secondaryColor: '#272727' });
  });



  function show()
  {
    if(labelVisibility == true)
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
    if (model.style.display === "none") 
    {
      model.style.display = "block";
    } 
    else 
    {
      model.style.display = "none";
    }
  }


