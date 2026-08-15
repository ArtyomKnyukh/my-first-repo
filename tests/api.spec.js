import { test, expect } from "@playwright/test";
import BookingBuilder from "../data/BookingBuilder";

test.describe("API-tests for Restful-booker", () => {
  //для последовательного запуска тестов(чтобы можно было запомнить айди букинга и токен авторизации)
  test.describe.configure({ mode: "serial" });

  const baseURL = "https://restful-booker.herokuapp.com";

  const booking = new BookingBuilder("Jim","Brown")
  .withTotalPrice(111)
  .withDeposit(true)
  .withBookingDates("2018-01-01","2019-01-01")
  .withAdditionalNeeds("Breakfast")
  .build();

  const updatedBooking = new BookingBuilder("Jimmy","Brownie")
  .withTotalPrice(9231)
  .withDeposit(true)
  .withBookingDates("2018-01-01","2019-01-01")
  .withAdditionalNeeds("Dinner")
  .build();
  
  const user = {
    username: "admin",
    password: "password123",
  };

  let bookingid;
  let authToken;
  let token;

  test("Create booking", async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, {
      data: booking,
    });

    console.log(`Статус-код: ${response.status()}`);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log("Тело ответа:", responseBody);
    expect(responseBody).toHaveProperty("bookingid");

    bookingid = responseBody.bookingid;
    expect(responseBody.booking).toEqual(booking);
  });

  test("Get info about booking", async ({ request }) => {
    const response = await request.get(`${baseURL}/booking/${bookingid}`);

    console.log(`Статус-код: ${response.status()}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Тело ответа:", responseBody);
    expect(responseBody).toEqual(booking);
  });

  test("Update booking", async ({ request }) => {
    const responseAuth = await request.post(`${baseURL}/auth`, { data: user });

    console.log(`Статус-код: ${responseAuth.status()}`);
    expect(responseAuth.status()).toBe(200);
    const responseAuthBody = await responseAuth.json();
    console.log("Тело ответа:", responseAuthBody);
    expect(responseAuthBody).toHaveProperty("token");

    token = responseAuthBody.token;

    const response = await request.put(`${baseURL}/booking/${bookingid}`, {
      data: updatedBooking,
      headers: {
        'Cookie': `token=${token}`,
      },
    });

    console.log(`Статус-код: ${response.status()}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log("Тело ответа:", responseBody);

    expect(responseBody).toEqual(updatedBooking);
  });

  test("Delete booking", async ({ request }) => {
    const response = await request.delete(`${baseURL}/booking/${bookingid}`, {
      headers: {
        'Cookie': `token=${token}`,
      },
    });

    console.log(`Статус-код: ${response.status()}`);
    expect(response.status()).toBe(201);

    const responseCheck = await request.get(`${baseURL}/booking/${bookingid}`);

    console.log(`Статус-код: ${responseCheck.status()}`);
    expect(responseCheck.status()).toBe(404);
  });
});
