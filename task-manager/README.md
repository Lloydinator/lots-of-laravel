# Life Task Manager

Life Task Manager will help you keep track of the things you need in your life. 

### How to setup the app
- Unzip the file and extract it's contents.
- Make sure that you have MySQL installed on your machine.
    - Create a database via MySQL and name it whatever you like. Instructions for [Windows](https://www.microfocus.com/documentation/idol/IDOL_12_0/MediaServer/Guides/html/English/Content/Getting_Started/Configure/_TRN_Set_up_MySQL.htm) and [macOS](https://www.geeksforgeeks.org/how-to-install-mysql-on-macos/).
    - In the project, rename the **`.env.example`** file to just **`.env`**. 
- Open two terminal windows and navigate to the project root directory. 
    - Once there, run `composer install` in one and `npm install` in the other.
    - Afterward, run `php artisan serve` and `npm run dev`.



### How to use the app
- In your web browser, navigate to the app URL (usually http://localhost). 
- Enter a task up to 255 characters in the text box and press Enter.
- To edit a task, click on the Pencil icon.
- To delete a task, click on the Trash icon.
- You can rearrange each task by hovering over a task, clicking on it, and moving it up or down.


### Under the hood
- Tasks are stored in the database after a 1.5 second delay.
- The JavaScript can be found in **`resources/js/app.js`**. No library was used.


**Enjoy!**

![image info](https://i.imgur.com/2XHov1W.jpg)