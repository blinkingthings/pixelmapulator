class Project {
    constructor(proj) {
        
    }
}

function Project(name) {
    this.setup = function(){
      //auto incrementing id
      this.id = next_project;
  
      //properties based on initial arguments supplied by Project()
      this.name = name;
  
  
      //defaults for each new Project
      this.screen_count = 0;
      this.output_count = 0;
      this.processor_count = 0;
      this.total_processors=[];
  
      //container for screens in this project
      this.led_screens = [];
  
      //container for outputs in this project
      this.outputs = [];
  
      //container for packed outputs, might replace preceding outputs array
      this.packed_outputs=[];
      this.didnt_fit=[];
  
      //index for counting tiles by screen
      this.tile_index = 0;
  
      //switches project to screen view
      this.output = document.getElementById('output-view');
      this.screen = document.getElementById('screen-view');
      this.output_view_button = document.getElementById('output-view-button');
      this.screen_view_button = document.getElementById('screen-view-button');
    };
    this.setup();
  
    //get constraints from selected tile, processor and output
    this.check_inputs = function() {
      //save values from inputs on DOM
      $project_name = document.getElementById('project-name').value;
  
  
  
      $tile_type = +document.getElementById('tile-type').options[document.getElementById('tile-type').selectedIndex].value;
      $processor_type = +document.getElementById('processor-type').options[document.getElementById('processor-type').selectedIndex].value;
      $output_type = +document.getElementById('output-type').options[document.getElementById('output-type').selectedIndex].value;
  
      //reset this Processor's values based on DOM inputs
      this.name = $project_name;
      //this.author = $project_author;
      //this.company = $project_company;
      //this.email = $project_email;
      //this.output_type = $output_type;
    };
    this.check_inputs();
  
    this.update = function() {
      //Project
      this.check_inputs();
    };
  
    this.add_screen = function(w, h) {
  
      //add a screen to this project
      this.led_screens.push(new Screen(w, h));
  
      //increase this project's screen count
      this.screen_count = this.led_screens.length;
  
      let $options = $('#tile-color-scheme').find('option');
      let random = ~~(Math.random() * $options.length);
  
      $options.eq(random).prop('selected', true);
  
    };
  
    this.add_outputs = function(w, h) {
  
  
      //add a screen to this project
      for (let i = 0; i < this.packed_outputs.length; i++){
  
        this.outputs.push(new Output(w, h));
      }
      //always make a single master output that can contain all outputs
      //this.outputs.push(new Output(this.total_output_width, this.total_output_height));
  
  
      //increase this project's screen count
      this.output_count = this.outputs.length;
    };
  
    this.switch_output = function(output_id){
      active_output = output_id;
      projects[active_project].outputs[active_output].load_output_to_output_view();
  
    }
  
    this.remove_screen = function(screen_id) {
      delete projects[active_project].led_screens[screen_id];
    };
    //calculate outputs required
    this.outputs_required = function() {
  
      let total_width, total_height;
      this.right_limit = 0;
      this.bottom_limit = 0;
      for (let i = 0; i < this.led_screens.length; i++){
        let rightmost = this.led_screens[i].pixels_wide + this.led_screens[i].screen_offset_x;
        let bottommost = this.led_screens[i].pixels_high + this.led_screens[i].screen_offset_y;
        if (rightmost > this.right_limit){
          this.right_limit = rightmost;
        }
        if (bottommost > this.bottom_limit){
          this.bottom_limit = bottommost;
        }
      }
  
      //what is the output resolution for our project?
      this.outputs_wide = Math.ceil(this.right_limit / output_types[this.output_type].width);
      this.outputs_high = Math.ceil(this.bottom_limit / output_types[this.output_type].height);
      this.total_output_width = this.outputs_wide * output_types[this.output_type].width;
      this.total_output_height = this.outputs_high * output_types[this.output_type].height;
      /*for (let y = 0; y < this.outputs_high; y++){
        for (let x = 0; x < this.outputs_wide; x++){
        //for each output required
         this.outputs.push(new Output(output_types[this.output_type].width,output_types[this.output_type].height));
        }
      }*/
  
      //return outputs required for this project
      return (this.outputs_high * this.outputs_wide);
    };
    //this.outputs_required();
  
    this.fix_output_thumbnails = function(){
      //for each thumbnail output excluding the last one. master thumbnail (-1)
      let thumbnail_count = 0;
      for (let i = 0; i < this.outputs_high; i++){
        for (let j = 0; j < this.outputs_wide; j ++){
        //switch canvas and ctx to that of thumbnail
        let canvas = document.getElementById('thumbnail'+thumbnail_count);
        let ctx = canvas.getContext('2d');
  
        //clear thumbnail
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        //let master_output = document.getElementById("project_"+active_project+"_output_"+(this.outputs.length-1));
  
        //ctx.drawImage(master_output,j * output_types[$output_type].width,i * output_types[$output_type].height,output_types[$output_type].width,output_types[$output_type].height,0,0,canvas.width,canvas.height);
        thumbnail_count +=1;
        }
      }
    };
  
    this.fix_stored_outputs = function(){
      //for each thumbnail output excluding the last one. master thumbnail (-1)
      let output_count = 0;
      for (let i = 0; i < this.outputs_high; i++){
        for (let j = 0; j < this.outputs_wide; j ++){
        //switch canvas and ctx to that of thumbnail
        let canvas = document.getElementById('project_'+active_project+'_output_'+j);
        let ctx = canvas.getContext('2d');
  
        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        //master output
        //let master_output = document.getElementById("project_"+active_project+"_output_"+(this.outputs.length-1));
  
        //ctx.drawImage(master_output,j * output_types[$output_type].width,i * output_types[$output_type].height,output_types[$output_type].width,output_types[$output_type].height,0,0,canvas.width,canvas.height);
        output_count +=1;
        }
      }
    };
  
    this.sort = {
  
  
     random  : function (a,b) { return Math.random() - 0.5; },
     w       : function (a,b) { return b.w - a.w; },
     h       : function (a,b) { return b.h - a.h; },
     a       : function (a,b) { return b.area - a.area; },
     max     : function (a,b) { return Math.max(b.w, b.h) - Math.max(a.w, a.h); },
     min     : function (a,b) { return Math.min(b.w, b.h) - Math.min(a.w, a.h); },
  
     height  : function (a,b) { return projects[active_project].sort.msort(a, b, ['h', 'w']);               },
     width   : function (a,b) { return projects[active_project].sort.msort(a, b, ['w', 'h']);               },
     area    : function (a,b) { return projects[active_project].sort.msort(a, b, ['a', 'h', 'w']);          },
     maxside : function (a,b) { return projects[active_project].sort.msort(a, b, ['max', 'min', 'h', 'w']); },
  
     msort: function(a, b, criteria) { /* sort by multiple criteria */
       var diff, n;
       for (n = 0 ; n < criteria.length ; n++) {
         diff = projects[active_project].sort[criteria[n]](a,b);
         if (diff != 0)
           return diff;
       }
       return 0;
     },
  
     now: function(blocks) {
       //demo had this point to a DOM element, i'm giving it values here
       //var sort = this.sort.val();
       var sort = 'maxside';
       if (sort != 'none')
         blocks.sort(projects[active_project].sort[sort]);
     }
  
    };
  
    this.count_processors = function(){
  
      for (let i = 0; i < this.led_screens.length; i++){
        //each screen
        for (let j= 0; j < this.led_screens[i].processors.length; j++){
          //each processor
          this.total_processors.push(this.led_screens[i].processors[j]);
        }
      }
      //console.log("Total Procs : "+this.total_processors);
      //bin pack to output size
  
      let blocks = [];
      this.total_processors.forEach(function(e){
  
        blocks.push({"w":e.width,"h":e.height,"proc":e.id,"screen":e.screen_id});
  
      });
      this.pack = function(blocks){
      //trying to fit processors
      let packed_output = new Packer(processor_types[$processor_type].resolutions[$output_type][0],processor_types[$processor_type].resolutions[$output_type][1]);
      //adjust different sort methods here
  
      this.sort.now(blocks);
      console.log("active packed output:"+active_packed_output);
      console.log("sorted incoming blocks:");
      console.dir(blocks);
      //blocks.sort(function(a,b) { return Math.max(b.w, b.h) - Math.max(a.w, a.h);  }); // sort inputs for best results
      packed_output.fit(blocks);
      //empty out previous didn't fit array
      this.didnt_fit = [];
      //console.log(blocks);
  
        //for each attempted packed processor
        let full =[];
        this.packed_outputs[active_packed_output]= [];
        for(var n = 0 ; n < blocks.length ; n++) {
          var block = blocks[n];
          //if the processors fit, add them to current packed output
          if (block.fit) {
  
            full.push({block});
            //blocks.splice(n,1);
          } else {
            console.log("something doesn't fit");
            //console.log(block);
            //didnt fit, add non-fitters to non-fit array
            //let output = {"w":block.w,"h":block.h};
            //console.log(output+" didnt fit");
            this.didnt_fit.push(block);
            //rerun this loop.
          }
        }
          full.forEach(function(e){
            projects[active_project].packed_outputs[active_packed_output].push(e);
          });
          //this.packed_outputs.push(full);
          //console.dir(this.didnt_fit);
          //console.log(blocks.length);
          //console.dir(blocks);
  
          //finished with one packed output, increase count
          if(this.didnt_fit.length > 0 && active_packed_output < 100 ){
            active_packed_output += 1;
            this.packed_outputs[active_packed_output]= [];
            //empty didnt fit
            console.log("We have leftovers, rerunning. ");
            //console.dir(this.didnt_fit[1]);
            this.pack(this.didnt_fit);
          } else {
          //this.pack(blocks);
          //alert(blocks.length);
        }
  
  
          console.log("Done Packing");
          console.dir(this.packed_outputs);
      };
      this.pack(blocks);
  
      //console.log(this.packed_outputs);
  
  
    };
  
    //function to wipe outputs from memory and dom when they change
    this.wipe_outputs = function(){
      //wipe packed outputs
      this.packed_outputs = [];
      active_packed_output = 0;
  
      //wipe thumbnails
      let output_thumbnails = document.getElementById("output-thumbs");
      output_thumbnails.innerHTML = '';
  
      let stored_project_canvases = document.getElementById('project_'+active_project).children;
  
      //wipe memory
      this.outputs = [];
      active_output = 0;
      next_output = 0;
  
  
  
  
      //remove stored output_canvases
      for (let i = 0; i < stored_project_canvases.length; i++){
        if (stored_project_canvases[i].className !== 'screen_canvas' || stored_project_canvases[i].id == 'project_0_output_0'){
          //delete all output canvases from dom
          stored_project_canvases[i].remove();
  
        }
        //flag - this is a super dirty fix for a bug I can't figure out
        let fixer;
        for (let i = 0; i < 10; i++){
          if (document.getElementById('project_0_output_'+i)){
          fixer = document.getElementById('project_0_output_'+i);
          fixer.remove();
          }
        }
      }
      this.count_processors();
      //create a new output object as we've just deleted them all
      this.add_outputs(processor_types[$processor_type].resolutions[$output_type][0],processor_types[$processor_type].resolutions[$output_type][1]);
      //this.add_outputs(output_types[$output_type].width,output_types[$output_type].height);
      //this.fix_output_thumbnails();
      //this.fix_stored_outputs();
    };
  
  
    //one master canvas per project. Will need to be updated.
    this.create_blank_master_canvas = function() {
      //create new <canvas> for each project
  
      this.canvas = document.createElement("canvas");
      this.canvas.setAttribute("id", "project_"+active_project+"_master");
      this.canvas.setAttribute("class", "master_canvas");
      this.canvas.setAttribute("style", "position: absolute; left: 0; top: 0; display: none;");
  
      //create screen_storage for current output if it doesnt exist yet
      if (document.getElementById("project_"+active_project)){
        //alert("Already exists");
      } else {
        this.screen_storage = document.createElement("div");
        this.screen_storage.setAttribute("id", "project_" + active_project);
        let canvas_storage = document.getElementById('storage');
        canvas_storage.insertBefore(this.screen_storage, canvas_storage.childNodes[0]);
  
      }
  
      //switch context to new canvas's context
      this.ctx = this.canvas.getContext("2d");
  
      //find place to insert canvas
      this.screen_storage = document.getElementById("project_"+active_project);
      this.screen_storage.insertBefore(this.canvas, this.screen_storage.childNodes[0]);
    };
    this.create_blank_master_canvas();
  
    this.screen_view = function() {
      //show or hide appropriate view
      this.output.classList.add("hidden");
      this.screen.classList.remove("hidden");
      this.output_view_button.classList.remove("selected");
      this.screen_view_button.classList.add("selected");
  
    };
  
    //switches project to output view
    this.output_view = function() {
      //show or hide appropriate view
      this.output.classList.remove("hidden");
      this.screen.classList.add("hidden");
      this.output_view_button.classList.add("selected");
      this.screen_view_button.classList.remove("selected");
  
      //first run of output_view after screens have been drawn
      //this.create_blank_output_canvas(active_output);
  
    };
  
  
    this.center_screen = function(){
  
  
      this.led_screens[active_led_screen].screen_offset_x = ((this.total_output_width / 2) - (this.led_screens[active_led_screen].pixels_wide / 2));
      this.led_screens[active_led_screen].screen_offset_y = ((this.total_output_height / 2) - (this.led_screens[active_led_screen].pixels_high / 2));
      console.log("centered offset x : "+this.led_screens[active_led_screen].screen_offset_x);
      console.log("centered offset y : "+this.led_screens[active_led_screen].screen_offset_y);
  
      document.getElementById('screen-offset-x').value = this.led_screens[active_led_screen].screen_offset_x;
      document.getElementById('screen-offset-y').value = this.led_screens[active_led_screen].screen_offset_y;
  
      this.outputs[active_output].store_output_canvas();
      this.outputs[active_output].load_output_to_output_view();
      //this.fix_output_thumbnails();
      //this.fix_stored_outputs();
    };
  
  
  
    //increase id count
    next_project += 1;
    active_project = this.id;
  }