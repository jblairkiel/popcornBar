## popcornBar JQuery Plugin

An elegant solution for web navigation.  The navigation pane stays out of the way until its is needed, allowing your users to view more of your site.  Clicking on the square in the top-right of the page will open and close the popup-pane.

### Usage


```markdown
  $("#bar").popcornBar({
      "barStructure": [
          { "value":"Home", "name":"Home", "link":"."},
          { 
            "value":"Projects",
            "name":"Projects",
            "subStructure":
            [
                  {"value":"Project 1","name":"Project 1","link":"."},
                  {"value":"Project 2","name":"Project 2","link":"."},
                  {"value":"Project 2","name":"Project 3","link":"."}
            ]
          },
          { "value":"Contact", "name":"Contact", "link":"."}
      ],
      "barIcon": null
  });
```


### Support or Contact

Future development is likely for this project.  Please submit any feature request or bugs as issues.

Thanks!

-Blair
