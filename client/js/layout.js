/* Main Templates */
Template.mobile.rendered = function() {
  if (Meteor.user())
    snap = new Snap({
      element: mobile,
      disable: 'right'
    });
}
