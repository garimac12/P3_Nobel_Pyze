// Fetching data exported from the SQL Server
fetch('./Resources/AllTables.JSON')
    .then(response => response.json())
    .then(data => {
        // Calculate sums for Prize Amount and Adjusted Prize Amount
        let totalPrizeAmount = data.LaureatesAndAwards.reduce((sum, laureate) => sum + laureate.Prize_Amount, 0);
        let totalAdjustedPrizeAmount = data.LaureatesAndAwards.reduce((sum, laureate) => sum + laureate.Prize_Amount_Adj, 0);

        // Count male and female laureates
        let maleCount = data.LaureatesAndAwards.filter(laureate => laureate.Gender === 'male').length;
        let femaleCount = data.LaureatesAndAwards.filter(laureate => laureate.Gender === 'female').length;

        // Find the most common values for Affiliation and Birth Country
        let affiliationCounts = {};
        let birthCountryCounts = {};
        let affiliationCities = {}; // Store cities corresponding to each affiliation

        data.LaureatesAndAwards.forEach(laureate => {
            // Check for null values before counting Affiliation
            if (laureate.Affiliation_Name !== null) {
                affiliationCounts[laureate.Affiliation_Name] = (affiliationCounts[laureate.Affiliation_Name] || 0) + 1;

                // Store the city corresponding to the affiliation
                if (!affiliationCities[laureate.Affiliation_Name]) {
                    affiliationCities[laureate.Affiliation_Name] = laureate.Award_City;
                }
            }

            // Check for null values before counting Birth Country
            if (laureate.Birth_Country !== null) {
                birthCountryCounts[laureate.Birth_Country] = (birthCountryCounts[laureate.Birth_Country] || 0) + 1;
            }
        });

        let mostCommonAffiliation = getMaxKey(affiliationCounts);
        let mostCommonAffiliationCity = affiliationCities[mostCommonAffiliation];
        let mostCommonBirthCountries = getTopKeys(birthCountryCounts, 3);

        // Display the results in the dashboard
        document.getElementById('totalPrizeAmount').innerText = formatPrizeAmount(totalPrizeAmount);
        document.getElementById('totalAdjustedPrizeAmount').innerText = formatPrizeAmount(totalAdjustedPrizeAmount);
        document.getElementById('maleCount').innerText = maleCount;
        document.getElementById('femaleCount').innerText = femaleCount;
        document.getElementById('mostCommonAffiliation').innerText = `${mostCommonAffiliation}, ${mostCommonAffiliationCity}`;
        document.getElementById('mostCommonBirthCountry').innerText = mostCommonBirthCountries.join(', ');

        // Format the total prize amount
        function formatPrizeAmount(amount) {
            if (amount >= 1e9) {
                return `$${(amount / 1e9).toFixed(2)}b`;
            } else if (amount >= 1e6) {
                return `$${(amount / 1e6).toFixed(2)}m`;
            } else {
                return `$${amount.toFixed(2)}`;
            }
        }

        // Calculate the total number of Laureate_ids for the laureate total
        let totalLaureateIds = data.LaureatesAndAwards.length;

        // Calculate the total number of null values in the gender field for the number of organizational award winners
        let totalNullGenders = data.LaureatesAndAwards.filter(laureate => laureate.Gender === null).length;

        // Display the results in the dashboard
        document.getElementById('totalLaureateIds').innerText = totalLaureateIds;
        document.getElementById('totalNullGenders').innerText = totalNullGenders;

    })
    .catch(error => console.error('Error fetching data:', error));

function getMaxKey(obj) {
    return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
}

function getTopKeys(obj, count) {
    return Object.keys(obj).sort((a, b) => obj[b] - obj[a]).slice(0, count);
}