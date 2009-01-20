/***** Make sure WMD has finished loading *****/
if (!Attacklab || !Attacklab.wmd) {
    alert("WMD hasn't finished loading!");
    // return;
}

var instances = []

var WmdFilterPartObserver = Class.create({
  
  initialize: function(element) {    
    this.element = element;
    this.part_element = element.down('.part');
    this.part_id = this.part_element.id.match(/part\-(.+)/)[1];
    this.filter_select_menu = this.element.down('select');
    this.textarea = this.element.down('textarea');
    this.setup();
  },
  
  setup: function() {
    this.filter_select_menu.observe('change', this.handleFilterChanged.bind(this));
    if(this.isWmdFilterSelected()){
      this.updateTextArea();
    }
  },
  
  handleFilterChanged: function(event) {
    this.updateTextArea();
  },
  
  isWmdFilterSelected: function() {
    return this.filter_select_menu.options[this.filter_select_menu.selectedIndex].value == 'Markdown';
  },
  
  updateTextArea: function() {
    if(this.isWmdFilterSelected()) {
      this.setEditor();
    } else if (!this.isWmdFilterSelected()) {
      this.unsetEditor();
    }
  },
  
  setEditor: function() {
    var previewDiv = document.createElement("div");
    previewDiv.id = "filter_preview";
    Element.insert(this.textarea, {after: previewDiv});

    /***** build the preview manager *****/
    textarea = this.textarea
    var panes = {input:textarea, preview:previewDiv, output:null};
    var previewManager = new Attacklab.wmd.previewManager(panes);

    /***** build the editor and tell it to refresh the preview after commands *****/
    var editor = new Attacklab.wmd.editor(textarea,previewManager.refresh);

    // save everything so we can destroy it all later
    instances.push({ta:textarea, div:previewDiv, ed:editor, pm:previewManager});
  },
  
  unsetEditor: function() {
    var inst = instances.pop();

    if (inst) {
      /***** destroy the editor and preview manager *****/
      inst.pm.destroy();
      inst.ed.destroy();

      // remove the dom element
      inst.div.parentNode.removeChild(inst.div);
    }
  }
  
});

WmdFilterPartObserver.pages = new Array();

WmdFilterPartObserver.init = function() {
  tab_control = $('tab-control');
  if (tab_control) {
    tab_control.select('.page').each(function(element) {
      if(!WmdFilterPartObserver.pages.include(element.id)) {
        WmdFilterPartObserver.pages.push(element.id);
        new WmdFilterPartObserver(element);
      }
    });
  }
}

var WmdSnippetPartObserver = Class.create(WmdFilterPartObserver, {
  initialize: function(snippet_textarea, select_filter) {
    this.filter_select_menu = select_filter;
    this.textarea = snippet_textarea; 
    this.element = this.textarea.up('form');
    this.setup();
  },
});

WmdSnippetPartObserver.init = function() {
  snippet_content = $('snippet_content');
  snippet_filter = $('snippet_filter');
  if (snippet_content && snippet_filter) {
    new WmdSnippetPartObserver(snippet_content, snippet_filter);
  }
}

Ajax.Responders.register({ onComplete: WmdFilterPartObserver.init });

document.observe('dom:loaded', WmdFilterPartObserver.init);
document.observe('dom:loaded', WmdSnippetPartObserver.init);