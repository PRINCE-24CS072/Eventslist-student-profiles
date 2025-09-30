function setupUI() {
  const pageSize = 3;

  function loadStudents(page) {
    const paginated = paginateData(data.students, pageSize, page);
    renderCards("student-list", paginated, "student");
  }

  function loadEvents(page) {
    const paginated = paginateData(data.events, pageSize, page);
    renderCards("event-list", paginated, "event");
  }

  setupPagination(data.students.length, pageSize, loadStudents, "student-pagination");
  setupPagination(data.events.length, pageSize, loadEvents, "event-pagination");

  loadStudents(1);
  loadEvents(1);

  loadCountries();
  generateCaptcha();
}
