/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
		/* This is our first test suite - a test suite just contains
		* a related set of tests. This suite is all about the RSS
		* feeds definitions, the allFeeds variable in our application.
		*/
		describe('RSS Feeds', function() {
				/* This is our first test - it tests to make sure that the
				 * allFeeds variable has been defined and that it is not
				 * empty. Experiment with this before you get started on
				 * the rest of this project. What happens when you change
				 * allFeeds in app.js to be an empty array and refresh the
				 * page?
				 */
				it('are defined', function() {
						expect(allFeeds).toBeDefined();
						expect(allFeeds.length).not.toBe(0);
				});
				// Check every RSS Feed to make sure has a URL defined and not empty
				it('URL exists and not empty', function() {
					allFeeds.forEach( function(x) {
						// exists?
						expect(x.url).toBeDefined();
						// empty?
						expect(x.url.length).not.toBe(0);
					});
				});
				// Check every RSS Feed to make sure has a name defined and not empty
				it('Name exists and not empty', function() {
					allFeeds.forEach( function(x) {
						// exists?
						expect(x.name).toBeDefined();
						// empty?
						expect(x.name.length).not.toBe(0);
					});
				});
		});

		// Check the menu functionality
		// 1.Initial state is hidden
		// 2.Show menu on 1 click
		// 3.Hide menu on clicking twice
		describe('The menu', function() {
				// default state
			it('is hidden by default', function() {
				expect($('body').hasClass('menu-hidden')).toBe(true);
			});
				let menu = $('a.menu-icon-link');
				// first click
			it('is visible on click', function() {
				menu.click();
				expect(document.body.classList).not.toContain("menu-hidden");
			});
				// second click
			it('is Not visible on click', function() {
				menu.click();
				expect(document.body.classList).toContain("menu-hidden");
			});
		})

		// Check that loadFeed() is working properly, making sure there is at least 1 '.entry'
		// in the '.feed' container
		describe('Initial Entries', function() {
			// Run every time before testing
			beforeEach(function(done) {
				loadFeed(0, done);
			});
			// Check if object is not empty
			it('exists', function() {
				expect($('.feed .entry').length).not.toBe(0);
			});
		});

		// Check that the content updates when a new feed is loaded
		describe('New Feed Selection', function() {
			let previousFeed,
					currentFeed;
			// Get the initial feed
			beforeEach(function(done) {
				loadFeed(0, function() {
					// Load feed 0
					previousFeed = $('.feed').html();
					loadFeed(1, function() {
					// Load feed 1
					currentFeed = $('.feed').html();
					// Variables defined, begin testing
					done();
					});
				});
			});
			// Check old feed(0) vs current feed(1)
			it('has new loaded content', function() {
				expect(currentFeed).not.toBe(previousFeed);
			});
		});
}());
