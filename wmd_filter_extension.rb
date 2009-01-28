require_dependency 'application'

class WmdFilterExtension < Radiant::Extension
  version "1.1"
  description "WMD Markdown visual editor (<a href='http://wmd-editor.com'>http://wmd-editor.com</a>)"
  url "http://github.com/saturnflyer/radiant-wmd_filter-extension"
  
  def activate
    if ActiveRecord::Base.connection.tables.include?('config')
      Radiant::Config['wmd.output'] = "Markdown" unless Radiant::Config['wmd.output']
      Radiant::Config['wmd.lineLength'] = "60" unless Radiant::Config['wmd.lineLength']
      Radiant::Config['wmd.buttons'] = "bold italic | link blockquote code image | ol ul heading hr" unless Radiant::Config['wmd.buttons']
      Radiant::Config['wmd.autostart'] = "false" unless Radiant::Config['wmd.autostart']
    end
    admin.page.edit.add :parts_bottom, 'filter_preview', :before => 'edit_layout_and_type'
    admin.snippet.edit.add :form_bottom, 'admin/pages/filter_preview', :after => 'edit_buttons'
  end

end