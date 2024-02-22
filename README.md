# Food Recipes React Application
![image](https://github.com/Ahmed-Abou-Emran/food-recipe-app-admin/assets/64327685/6882da01-272c-40ab-b4e4-16e7f6b0d604)


Food Recipes is a web application that serves as a platform for managing and sharing food recipes. It features two portals: a user portal and an admin portal, each equipped with complete authentication functionalities, including registration, login, forget password, and change password.

## Table of Contents

- [Food Recipes React Application](#food-recipes-react-application)
  - [Table of Contents](#table-of-contents)
  - [Demo ](#demo)
  - [Introduction ](#introduction)
  - [Features ](#features)
  - [Usage ](#usage)
  - [Technologies and Packages Used ](#technologies-and-packages-used-)

## Demo <a name="demo"></a>
<a href="https://youtu.be/HyEEGYNKh0Q">Demo Link</a>
## Introduction <a name="introduction"></a>

Foodie Recipes is a versatile food recipe application with user and admin portals. The user portal allows users to view recipes added by admins, add recipes to their favorites, and remove them. The admin portal, on the other hand, provides administrators with the capability to add, edit, and delete food categories and recipes. Admins can also manage system users, deleting non-admin users as needed.

## Features <a name="features"></a>

- **User Portal**:

  - View recipes added by admins.
  - Add recipes to favorites.
  - Remove recipes from favorites.

- **Admin Portal**:

  - Add, edit, and delete food categories.
  - Add, edit, and delete food recipes.
  - Delete system users (non-admin).

- **Data Management**:
  - Both admin and users can filter data in the pages.
  - Pagination is implemented for efficient navigation.

## Usage <a name="usage"></a>

1. Upon logging in, users are directed to the user portal where they can explore and interact with recipes.
2. Users can add recipes to their favorites and remove them as desired.
3. Admins have access to the admin portal, allowing them to manage food categories, recipes, and system users.
4. Filtering data and pagination options are available for both portals to streamline information retrieval.

## Technologies and Packages Used <a name="technologies-and-packages-used"></a>

- [react-hook-form](https://react-hook-form.com): A powerful form management library for React, used for handling registration, login, and other form functionalities.

- [radix-ui](https://radix-ui.com): A library providing accessible components, enhancing the overall accessibility of the user interface.

- [styled-components](https://styled-components.com): A CSS-in-JS library used for styling React components, ensuring a consistent and visually appealing design.

- [axios](https://axios-http.com): A promise-based HTTP client for making API requests, vital for fetching and managing data in the application.

- [react-hot-toast](https://react-hot-toast.com): A lightweight toast library for displaying notifications, contributing to a user-friendly experience.

- [react-router-dom](https://reactrouter.com): A routing library for managing navigation within the application, supporting dynamic page transitions.

- **React Context API and Custom Hooks**:
  - Utilized for centralizing logic and state management.
  - Custom hooks are employed to efficiently share data and functionality across different components.
