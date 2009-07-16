require_dependency 'application_controller'

class WmdFilterExtension < Radiant::Extension
  version "1.1"
  description "WMD Markdown visual editor (http://wmd-editor.com)"
  url "http://github.com/saturnflyer/radiant-wmd_filter-extension"
  
  def activate
    Radiant::Config['wmd.output'] = "Markdown" unless Radiant::Config['wmd.output']
    Radiant::Config['wmd.lineLength'] = "60" unless Radiant::Config['wmd.lineLength']
    Radiant::Config['wmd.buttons'] = "bold italic | link blockquote code image | ol ul heading hr" unless Radiant::Config['wmd.buttons']
    Radiant::Config['wmd.autostart'] = "false" unless Radiant::Config['wmd.autostart']
    admin.pages.edit.add :parts_bottom, 'filter_preview', :before => 'edit_layout_and_type'
    admin.snippets.edit.add :form_bottom, 'admin/pages/filter_preview', :after => 'edit_buttons'
  end

end