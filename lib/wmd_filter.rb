require 'bluecloth'
require 'rubypants/rubypants'

class WmdFilter < TextFilter
  filter_name "WMD"
  description_file File.dirname(__FILE__) + "/../wmd.html"
  def filter(text)
    RubyPants.new(BlueCloth.new(text).to_html).to_html
  end
end