var model = {
  currentCat: null,
  
  init: function () 
  {
    var cat = function(imageUrl, name, clicks) 
	    {
	      this.imageUrl = imageUrl;
        this.name = name;
		    this.clicks = clicks;
		  } ;
		  
	  var myCats = new Array()
	  myCats[0] = new cat("https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426","miez1",0);
	  myCats[1] = new cat("https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496","mauz2",0);
	  myCats[2] = new cat("https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454","katze",0);
	  myCats[3] = new cat("https://media.giphy.com/media/vPN3zK9dNL236/giphy.gif","hund",0);
	  myCats[4] = new cat("http://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg","mauzieeees",0);
    	  
    return myCats;
    
  },
};

var controller = 
{
  init: function () 
  {
    model.currentCat = model.init()[0];
    listView.init();
    displayView.init();
  },
  
  getCurrentCat: function () {
    return model.currentCat;
  },
  
  getCatList: function() 
  {
    return model.init();
  }, 

  countClick: function()
  {
    model.currentCat.clicks++;
    displayView.renderDisplay();
  },
  
  selectCat: function (cat) {
    model.currentCat = cat;
  }
};

var listView = 
{
  init: function () 
  {
    console.log("ListView Init");
    this.catList = document.getElementById('catList');
    this.renderList(this);
  
  },
  
  renderList: function ()
  {
    console.log("ListView Render");
    var htmlStr = '';
    
    controller.getCatList().forEach(function(cat)
    {
      var elem = document.createElement('li');
      elem.textContent = cat.name;
      elem.addEventListener('click', (function(catCopy) {
        return function() {
          controller.selectCat(catCopy);
          displayView.renderDisplay();
        };
      })(cat));
      this.catList.appendChild(elem);
    })
  }
};

var displayView = 
{
  init: function () 
  {
    console.log("DisplayView Init");
    this.catImageElem = document.getElementById('catImage');
    this.catNameElem = document.getElementById('catName');
    this.catClicksElem = document.getElementById('catClicks');
    this.catImageElem.addEventListener('click', function()
    {
      controller.countClick();
    });
    this.renderDisplay();
  },
  
  renderDisplay: function ()
  {
    var currentCat = controller.getCurrentCat();
    this.catNameElem.textContent = currentCat.name;
    this.catClicksElem.textContent = currentCat.clicks + " Clicks";
    this.catImageElem.src = currentCat.imageUrl;
  }
};
controller.init();