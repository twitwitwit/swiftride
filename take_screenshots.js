import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUTPUT_DIR = "C:\\Users\\xivaM\\.gemini\\antigravity-cli\\brain\\4f42dda0-736f-4ee6-884b-8ec90a1a832c\\screenshots";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log("Launching Edge browser...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 2000));

  // Helper function to capture screenshot
  async function snap(filename) {
    const filePath = path.join(OUTPUT_DIR, filename);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`Saved screenshot: ${filename}`);
  }

  // 1. Web Portal
  await page.click('#view-web-portal');
  await new Promise(r => setTimeout(r, 1000));
  await snap('01_web_landing.png');

  // 2. Dual Simulator
  await page.click('#view-dual-simulator');
  await new Promise(r => setTimeout(r, 1000));
  await snap('02_dual_simulator.png');

  // 3. Passenger App - Views
  await page.click('#view-passenger-app');
  await new Promise(r => setTimeout(r, 1000));

  await page.click('#tab-passenger-home');
  await new Promise(r => setTimeout(r, 500));
  await snap('03_passenger_home.png');

  await page.click('#tab-passenger-book');
  await new Promise(r => setTimeout(r, 500));
  await snap('04_passenger_book.png');

  await page.click('#tab-passenger-history');
  await new Promise(r => setTimeout(r, 500));
  await snap('05_passenger_history.png');

  await page.click('#tab-passenger-chat');
  await new Promise(r => setTimeout(r, 500));
  await snap('06_passenger_chat.png');

  await page.click('#tab-passenger-profile');
  await new Promise(r => setTimeout(r, 500));
  await snap('07_passenger_profile.png');

  // 4. Driver App - Views
  await page.click('#view-driver-app');
  await new Promise(r => setTimeout(r, 1000));

  await page.click('#tab-driver-home');
  await new Promise(r => setTimeout(r, 500));
  await snap('08_driver_home.png');

  await page.click('#tab-driver-trips');
  await new Promise(r => setTimeout(r, 500));
  await snap('09_driver_trips.png');

  await page.click('#tab-driver-earnings');
  await new Promise(r => setTimeout(r, 500));
  await snap('10_driver_earnings.png');

  await page.click('#tab-driver-chat');
  await new Promise(r => setTimeout(r, 500));
  await snap('11_driver_chat.png');

  await page.click('#tab-driver-profile');
  await new Promise(r => setTimeout(r, 500));
  await snap('12_driver_profile.png');

  // 5. Admin Dashboard - Views
  await page.click('#view-admin-dashboard');
  await new Promise(r => setTimeout(r, 1000));
  await snap('13_admin_overview.png');

  // Click on admin sidebar tabs
  const adminTabs = [
    { id: '#admin-nav-live_trips', filename: '14_admin_live_map.png' },
    { id: '#admin-nav-bookings', filename: '15_admin_bookings.png' },
    { id: '#admin-nav-drivers', filename: '16_admin_drivers.png' },
    { id: '#admin-nav-passengers', filename: '17_admin_passengers.png' },
    { id: '#admin-nav-earnings', filename: '18_admin_earnings.png' },
    { id: '#admin-nav-support', filename: '19_admin_support.png' },
  ];

  for (const tab of adminTabs) {
    const tabEl = await page.$(tab.id);
    if (tabEl) {
      await tabEl.click();
      await new Promise(r => setTimeout(r, 800));
      await snap(tab.filename);
    }
  }

  await browser.close();
  console.log("All screenshots captured successfully!");
}

run().catch(err => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
