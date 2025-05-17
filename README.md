# signal-data-viewer

A signal viewer program using basic javascript.

# Overview

This repository documents my progression through building a signal visualizer in html, css, and javascript. The purpose of this project is to build up my skills in vanilla javascript before learning React.

# Technologies

HTML,
CSS,
Javascript (no frameworks)

# Challenges and Solutions

- **Challenge**: Getting the plot on the left side of the window, settings panel on the right side.
- **Solution**: Use flex display in the parent element and set the appropriate widths in the child elements.

- **Challenge**: Ensuring zooming and panning is smooth.
- **Solution**: Use the plugins for chart js. If larger datasets are desired, need to use more advanced plotting library, but for this project's purpose chart js will suffice.

- **Challenge**: Enabling data marking. Adding a new scatter point dataset requires setting linear x scale to true, which messes up the smooth lines.
- **Solution**: Add markers to the plugin, effectively drawing circles on the canvas, and avoiding creating a scatter dataset.

# Key Takeaways

-The 'let" keyword uses block scope, unlike the var keyword.

-When using the chart constructor, it is paramount to return the created chart instance in order to access and manipulate its min and max time properties.

-When using modules, if want changes in the graph to cascade to other parts of the main code, you need to output functions that accept your callback function in app.js.

-Sometimes it is better to create your own feature (custom plugin for adding markers) rather than using the built in capabilites of chart js (combining line and scatter data in one plot).

