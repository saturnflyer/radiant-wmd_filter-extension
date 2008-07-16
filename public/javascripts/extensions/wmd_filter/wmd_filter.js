wmd_options = { autostart: false };

/***** Make sure WMD has finished loading *****/
if (!Attacklab || !Attacklab.wmd) {
    alert("WMD hasn't finished loading!");
    return;
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
    this.updateTextArea();
  },
  
  handleFilterChanged: function(event) {
    this.updateTextArea();
  },
  
  isWmdFilterSelected: function() {
    return this.filter_select_menu.options[this.filter_select_menu.selectedIndex].value == 'WMD';
  },
  
  updateTextArea: function() {
    if(this.isWmdFilterSelected() && wmd.get(this.textarea.id) == null) {
      this.setEditor();
    } else if (!this.isWmdFilterSelected() && wmd.get(this.textarea.id) != null) {
      this.unsetEditor();
    }
  },
  
  setEditor: function() {

    var previewDiv = document.createElement("div");
    this.textarea.style.width = '49%'
    this.textarea.style.float = 'left'
    previewDiv.style.width = '49%'
    previewDiv.style.float = 'left'
    // var br = document.createElement("br");
    // br.style.clear = 'both'
    this.textarea.parent.appendChild(previewDiv);

    /***** build the preview manager *****/
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
      this.textarea.style.width = '100%'
      this.textarea.style.float = 'none'
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
    this.setup();
  },
});

WmdSnippetPartObserver.init = function() {
  snippet_content = $('snippet_content');
  snippet_filter = $('snippet_filter');
  if (snippet_content && snippet_filter) {
    new TinymceSnippetPartObserver(snippet_content, snippet_filter);
  }
}

Ajax.Responders.register({ onComplete: WmdFilterPartObserver.init });

document.observe('dom:loaded', WmdFilterPartObserver.init);
document.observe('dom:loaded', WmdSnippetPartObserver.init);
