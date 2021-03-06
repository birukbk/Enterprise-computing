(function () {

  angular
    .module('bookFaceApp')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    var vm = this;

    vm.pageHeader = {
      title: 'About bookFace'
    };
    vm.main = {
      content: 'Enterprise-computing\nEnterprise computing, coursework 3 BookFace\n\nOverview\n\nThis coursework covers the development of an enterprise level application\n using a Javascript based framework (or similar technology). The coursework is designed to give students hands on experience with building enterprise applications. Furthermore, all the technologies used are production grade, giving students the experience and knowledge they need to build a real enterprise application. \n\nScenario\n\nYou have been asked to develop Bookface, a social networking site for people who love reading, and always have their face in a book. The site will allow avid readers to comment on their favourite books, rate books, and to read the comments made by others on their favourite books, and other books by their favourite authors. Users must register before they can submit comments on a book and be authorised via email. Users should choose a screen name and they should supply an email address. \n\nThe site should list authors together with their books. Comments are made on books, not on authors. Users can add authors if they are not already there, and they can add books to authors. Your program should list their favourite books of a user and be able to see other members of the site who listed those books as being among their favourite books.\n\nYou can use any JavaScript based stack to complete this task but it must use Node.js'
    };
  }

})();