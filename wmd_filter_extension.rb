require_dependency 'application'

class WmdFilterExtension < Radiant::Extension
  version "1.0"
  description "WMD Markdown visual editor (<a href='http://wmd-editor.com'>http://wmd-editor.com</a>)"
  url "http://github.com/MrGossett/radiant-wmd-filter-extension"
  
  def activate
    admin.page.edit.add :parts_bottom, 'edit_wmd', :before => 'edit_layout_and_type'
  end

  def deactivate
    admin.page.edit.form.delete 'edit_wmd'
  end

end