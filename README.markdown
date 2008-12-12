Installing WMD Filter
---------------------

 1. `cd vendor/extensions`
 2. `git clone git clone git://github.com/kmayer/radiant-wmd-filter-extension.git wmd_filter`
 3. `rake radiant:extensions:wmd_filter:update`
 4. restart your server


----------


  - The javascripts (`wmd_filter.js` & `wmd.js`) are automatically added by the extension.
  - You can tweak the behavior of the editor by changing the `_edit_wmd.html.erb` partial
  - Look at the `vendor/extensions/wmd_filter/{api|minimal|options}Example.html` files for hints

