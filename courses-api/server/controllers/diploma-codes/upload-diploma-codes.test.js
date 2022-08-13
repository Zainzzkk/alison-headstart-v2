const { uploadDiplomaCodesController } = require('./upload-diploma-codes');

describe('uploadCourseCodesController()', () => {
  it('should return status 400 if body is null', async () => {
    const body = null;

    const response = await uploadDiplomaCodesController(body);

    expect(response.status).toEqual(400);
    expect(response.message).toEqual('File has no contents');
  });

  // it('should return status 200 if successful', async () => {
  //   const body = [
  //     {
  //       Code: 123,
  //       Type: 'Diploma',
  //       Expiry: 45642,
  //       Status: 'Used',
  //       Date: 45556
  //     }
  //   ];

  //   const response = await uploadDiplomaCodesController(body);

  //   expect(response.status).toEqual(200);
  //   expect(response.message).toContain('Uploaded the diploma file successfully to the database');
  // })
})