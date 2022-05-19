# Restaurant Roulette

Good work y'all -- nice job pulling in the Yelp API and getting the locations services to work properly. I know that was tricky. Here's some general feedback but overall nice work:

- Your styling could use a little love - the background feels disjointed from the rest of the styles -- if you're going to use a picture background, you can always use coolrs generate pallette from image feature which will allow your colors to integrate a little better. Also in the future, try not to leave your CSS until the very end -- it always takes longer than you think.
- You've got some inconsistency with your upper / lower case naming conventions - just a few examples:
  - Components folder, Context folder and Views folder should be lower case (only upper case your folders if they match the name of a component)
  - Restaurant-List should be RestaurantList
  - restaurantlist.css should be RestaurantList.css
- There's a bug if you try to add a note when you're not logged in - you should not show the form if you aren't logged in
- Its a bit of a bummer there's not an actual roulette aspect to this -- there are some open source React roulette libraries you could try to incorporate which would be fun
- Nice work on the restaurant context
