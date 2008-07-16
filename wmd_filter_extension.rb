require_dependency 'application'

class WmdFilterExtension < Radiant::Extension
  version "1.0"
  description "Describe your extension here"
  url "http://yourwebsite.com/wmd_filter"
  
  def activate
    # Load the filter
    WmdFilter
    
    # Add the appropriate stylesheets to the javascripts array in the page and snippet controller
    include_js = lambda do
      before_filter :add_wmd_javascripts, :only => [:edit, :new]
      private
      def add_wmd_javascripts
        @javascripts << 'extensions/wmd_filter/wmd_filter' << 'extensions/wmd_filter/wmd'
      end
    end
    Admin::PageController.class_eval &include_js
    Admin::SnippetController.class_eval &include_js
  end

  def deactivate
  end
  
end