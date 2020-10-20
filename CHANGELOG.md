# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2020-10-??
### Added
- Guest Mode: Play without logging into your Google account. You will be unable to make any suggestions.
- Path Caching: Making path finding for elements quicker if it's been queried for before.

### Changed
- The "Login with Google" button has been swapped with a more visible button.

## [1.5.2] - 2020-10-06
### Fixed
- You can no longer suggest elements named "Your Element".

## [1.5.1] - 2020-10-05
### Fixed
- Fixed a server error when trying to get a up and coming or lonely suggestion when there are none.
- Client no longer shows the up and coming or the lonely suggestion element as non-submittable.

### Known Bugs
- You can suggest elements named "Your Element".

## [1.5.0] - 2020-10-05
### Added
- Added buttons to get an Up and Coming Suggestion and a Random Lonely Suggestion.

## [1.4.2] - 2020-09-20
### Fixed
- Element names now only accept proper, readable characters.
- Element names not fit to the element box.

## [1.4.1] - 2020-09-19
### Fixed
- Fixed being able to bypass the character limit by changing the color after you've placed text.

## [1.4.0] - 2020-09-19
### Added
- Live element feed. See elements as soon as they are added.
- Voting now check the amount of downvotes subtracted from the upvote count.

## [1.3.0] - 2020-09-20
### Added
- Smooth scrolling when the game takes you to an element you created.
- Elemental 4 implementation 👀.
- Online player count.
- You can now view who suggested and created elements by dropping an element into the drop zone on the right side.
- Notifications every time you combine elements.
- Notification when you upvote or downvote an element you already upvoted or downvoted.
- You can now view the elements that make up any element.

## Fixed
- Fixed wacky margins.
- Fixed possible null child value when voting through an element with the same name as an existing element.

## [1.2.0] - 2020-09-16
### Added
- Added feedback when you vote for an element and it gets voted through.
- View total element counts per color category.

### Fixed
- Made sure adding elements with the same name as others properly adds the element. (#1)
- Fixed not being able to edit an element's name after setting it to a blank string. (#2)

## [1.1.0] - 2020-05-31
### Added
- Downvoting.

## [1.0.0] - 2020-05-23
### Added
Initial game.
