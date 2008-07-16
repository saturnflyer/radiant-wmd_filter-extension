# Uncomment this if you reference any of your controllers in activate
# require_dependency 'application'

class WmdFilterExtension < Radiant::Extension
  version "1.0"
  description "Describe your extension here"
  url "http://yourwebsite.com/wmd_filter"
  
  # define_routes do |map|
  #   map.connect 'admin/wmd_filter/:action', :controller => 'admin/wmd_filter'
  # end
  
  def activate
    # admin.tabs.add "Wmd Filter", "/admin/wmd_filter", :after => "Layouts", :visibility => [:all]
  end
  
  def deactivate
    # admin.tabs.remove "Wmd Filter"
  end
  
end