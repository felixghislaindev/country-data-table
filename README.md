### Interactive Country Data Table Component

This project involves building an interactive country data table component that fetches country information from a GraphQL API and displays it. the app also has various features like filtering, pagination, and search functionality.

### Features and Requirements:

1. **Data Display**:

   - Fetch and display country data from the provided GraphQL endpoint.
   - Columns to display:
     - **Country Name**
     - **Country Code**
     - **Continent**
     - **Currency**
   - Show the total number of entries in the dataset.

2. **Pagination**:

   - Implement table pagination with:
     - Options for entries per page (10, 20, 50, 100).
     - Display the current page number and total pages.
     - Add previous/next navigation buttons.
     - Update the URL to reflect the current page state for better user experience.

3. **Filtering & Search**:

   - Add a **continent filter** dropdown to filter countries by continent.
   - Add a **currency filter** dropdown to filter countries by currency.
   - Create a **search** feature:
     - Exact match search for **country code**.
     - Fuzzy search for **country name** (partial matching).
   - Filters should be combinable, meaning users can apply multiple filters at the same time.
   - Update the results in real-time as filters change.

4. **Technical Requirements**:

   - **TypeScript** for all components and utilities to ensure type safety and easy maintainability.
   - **Apollo GraphQL Client** to fetch data from the GraphQL API (`https://countries.trevorblades.com/graphql`).
   - **Tailwind CSS** for styling, ensuring a responsive layout.
   - **Recoil (optional)** for managing global state across the components.
   - Implement proper **error handling** for API calls, including loading and error states.
   - Ensure the design is **responsive** across all screen sizes.

5. **Additional Notes**:
   - **Debounce** should be implemented for the search input to reduce the number of requests while typing.
   - Use a **loading state** to show when data is being fetched asynchronously.
   - **Pagination state** should update the URL so the page can be bookmarked or shared with the same data view.

---

### Code Explanation:

1. **Apollo GraphQL Client**:  
   I used Apollo Client to fetch data from the GraphQL API. We’ll define a query to fetch the required fields (country name, code, continent, and currency) and use `useQuery` to fetch the data inside our component.

2. **Table Component**:  
   The table displays country data dynamically.

3. **Pagination**:  
   Pagination controls added at the bottom of the table, handle's page state and the number of items per page using React state, and update the displayed data accordingly.

4. **Filtering & Search**:  
   Filters implemented as dropdowns, with handlers to update the table data based on the selected filters. The search bar will filter by country code (exact match) or country name.

### Technical Stack:

- React - The core library for building user interfaces.
- Apollo Client - A library for fetching data from a GraphQL API.
- Tailwind CSS - A utility-first CSS framework for styling.
- Recoil - A state management library for React applications.

- React Router DOM - A library for handling routing in React applications.
- GraphQL - A query language for APIs, used in conjunction with Apollo Client for data fetching.
- Lucide React - A library of open-source icons for React.
- React Feather - A collection of customizable icons for React applications.
- tailwindcss/vite - A Vite plugin for integrating Tailwind CSS.
- Vite - A fast and modern build tool for React applications.

I just wanted to express my gratitude for this experience. I've learned so much, particularly with Recoil, and it has been incredibly valuable in expanding my knowledge. Thank you for the opportunity to work on this project!
