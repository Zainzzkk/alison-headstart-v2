// const { uploadLearnersStatsController } = require('./upload-learners-stats');

// describe('uploadLearnersStatsController()', () => {
//   it('should return status 400 if body is null', async () => {
//     const body = null;

//     const response = await uploadLearnersStatsController(body);

//     expect(response.status).toEqual(400);
//     expect(response.message).toEqual('File has no contents');
//   });

//   it('should return status 500 if unsuccessful and error - duration out of bounds', async () => {
//     const body = [
//       {
//         'IIUK ID': '456',
//         'Age Band': '25-35',
//         Gender: 'Male',
//         Jamatkhana: 'Test',
//         'Total Duration': 554554,
//         'Number of Courses': '1',
//       }
//     ];

//     const response = await uploadLearnersStatsController(body);

//     expect(response.status).toEqual(500);
//   });

//   it('should return status 500 if unsuccessful and error - no id', async () => {
//     const body = [
//       {
//         'response': 'response'
//       }
//     ];

//     const response = await uploadLearnersStatsController(body);

//     expect(response.status).toEqual(500);
//   })

//   it('should return status 200 if successful', async () => {
//     const body = [
//       {
//         'IIUK ID': '456',
//         'Age Band': '25-35',
//         Gender: 'Male',
//         Jamatkhana: 'Test',
//         'Total Duration': 5545,
//         'Number of Courses': '1',
//       }
//     ];

//     const response = await uploadLearnersStatsController(body);

//     expect(response.status).toEqual(200);
//     expect(response.message).toContain('Uploaded the the learner stats data successfully');
//   });
// })