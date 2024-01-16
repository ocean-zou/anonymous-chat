import axios from 'axios';

const compareProductWithCompetitors = async (product, competitors) => {
  const apiUrl = 'http://gateway.data.k8sdev.newaim-internal.com/competitor/compete_score';
  const requests= [];

  // Create promises based on the number of competitors
  competitors.forEach((competitor) => {
    const request = axios.post(apiUrl, {
      sku_title_a: product,
      sku_title_b: competitor
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    requests.push(request);
  });

  // Record start time
  const startTime = Date.now();

  try {
    // Send concurrent requests using Promise.all
    const responses = await Promise.all(requests);

    // Calculate total runtime
    const endTime = Date.now();
    const totalTime = endTime - startTime;

    // Aggregate scores from each response
    const allScores = responses.map(response => response.data.score);

    // Process each response
    responses.forEach((response, index) => {
      // Handle each response here
      console.log(`Request ${index + 1} status code: ${response.status}, score: ${response.data.score}`);
    });

    console.log(`Total time for ${competitors.length} requests: ${totalTime}ms`);

    // Return all scores
    return allScores;
  } catch (error) {
    console.error('Error during requests:', error);
    return []; // Return an empty array if there's an error
  }
};

export default compareProductWithCompetitors;