import { loginController } from '../controllers/Credentials/loginController';

// handles logging in
export default async function login(data) {
  const response = await loginController(data);

  return response;
}
