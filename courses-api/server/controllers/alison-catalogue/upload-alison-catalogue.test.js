const { uploadAlisonCatalogueController } = require('./upload-alison-catalogue');

describe('uploadAlisonCatalogueController()', () => {
  it('should return status 400 if body is null', async () => {
    const body = null;

    const response = await uploadAlisonCatalogueController(body);

    expect(response.status).toEqual(400);
    expect(response.message).toEqual('File has no contents');
  });

  it('should return status 500 if error uploading to DB', async () => {
    const body = [
      {
        nonsense: 'nonsense',
      }
    ];

    const response = await uploadAlisonCatalogueController(body);

    expect(response.status).toEqual(500);
    expect(response.message).toContain('Fail to import alison-catalogue into database!');
  });

  it('should return status 200 if successful', async () => {
    const body = [
      {
        'Course ID': 12345,
        'Course Name': 'Diploma in ABC',
      }
    ];

    const response = await uploadAlisonCatalogueController(body);

    expect(response.status).toEqual(200);
    expect(response.message).toContain('Uploaded the alison-catalogue data successfully');
  })
})