Feature: Shopping cart
  As a shopper
  I want to add and remove products in my cart
  So that I only buy what I intend to

  Background:
    Given the shopper is on the Toolshop home page

  Scenario: A shopper adds a product and sees it in the cart
    When the shopper opens the "Combination Pliers" product
    And the shopper adds 1 of it to the cart
    And the shopper opens the cart
    Then the cart lists "Combination Pliers" with quantity 1
    And the cart total equals the product price

  Scenario: Removing the last item empties the cart
    Given the cart contains 1 "Combination Pliers"
    When the shopper opens the cart
    And the shopper deletes "Combination Pliers"
    Then the cart shows no items
    And the cart total is 0

  Scenario: Deleting one of two identical items removes only that row
    Given the cart contains 2 separate rows of "Combination Pliers"
    When the shopper opens the cart
    And the shopper deletes the first "Combination Pliers" row
    Then the cart still lists 1 "Combination Pliers"