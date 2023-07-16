import { expect, type Page, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction((e) => {
    return JSON.parse(localStorage['tasks']).length === e;
  }, expected);
}

async function createDefaultTodos(page: Page) {
  const newTodo = page.getByPlaceholder('todo');

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment',
];

test.describe('유저는 입력영역에 해야되는 일들을 입력하고 리스트에 추가한다.', () => {
  test('유저가 입력영역에 해야되는 일들을 입력하고 + 버튼을 클릭하거나 엔터를 누르면 새로운 task가 대기 리스트 마지막에 추가된다', async ({
    page,
  }) => {
    // create a new todo locator
    const inProgressSection = page.getByTestId('inProgress-section');
    const newTodo = page.getByPlaceholder('todo');
    const addButton = page.getByRole('button', { name: '+' });

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Make sure the list only has one todo item.
    await expect(inProgressSection.getByRole('paragraph')).toHaveText([
      TODO_ITEMS[0],
    ]);

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await addButton.click();

    // Make sure the list now has two todo items.
    await expect(inProgressSection.getByRole('paragraph').nth(1)).toHaveText([
      TODO_ITEMS[1],
    ]);

    await checkNumberOfTodosInLocalStorage(page, 2);

    await newTodo.fill('');
    await expect(addButton).toBeDisabled();

    await newTodo.fill('');
    await newTodo.press('Enter');
    const tasksList = (await inProgressSection.getByRole('paragraph').all())
      .length;

    await expect(tasksList).toEqual(2);
    await checkNumberOfTodosInLocalStorage(page, 2);
  });
});

test.describe('유저가 Task 내용을 편집한다', () => {
  test('Tasks 중에 내용을 변경하고 싶은 Task의 라벨을 클릭하면 input창으로 변경되고 기존 task 내용 끝에 focus가 있다', async ({
    page,
  }) => {
    await createDefaultTodos(page);

    // 대기리스트에 Task 가 존재할 때  Tasks 중에 내용을 변경하고 싶은 Task의 라벨을 클릭하면 input창으로 변경된다.
    const inProgressSection = page.getByTestId('inProgress-section');
    const inProgressArea = await page.waitForSelector(
      '[data-testid="inProgress-section"]'
    );
    const firstTask = inProgressSection
      .getByRole('paragraph')
      .and(inProgressSection.getByText('buy some cheese'));

    const firstInput = inProgressSection
      .getByRole('textbox')
      .and(inProgressSection.getByText('buy some cheese'));
    await expect(firstInput).not.toBeInViewport();

    await firstTask.click();

    const taskInput = await page.$('input[value="buy some cheese"]');
    const focused = await page.evaluate(
      (el) => el === document.activeElement,
      taskInput
    );
    expect(focused).toBe(true);

    await expect(firstTask).not.toBeInViewport();

    // input 창에 변경내용을 적고 input 외 영역을 클릭(엔터 프레스)하면 입력한 내용으로 task 가 변경되고 input창이 사라진다.

    await taskInput?.type('a');
    const outsideElement = await page.$('body');
    await outsideElement?.click();

    await expect(firstTask).toHaveText('buy some cheesea');
    await expect(firstInput).not.toBeInViewport();

    // 엔터

    await firstTask.click();

    const taskInputt = await page.$('input[value="buy some cheesea"]');
    const focusedd = await page.evaluate(
      (el) => el === document.activeElement,
      taskInputt
    );
    expect(focusedd).toBe(true);

    await taskInputt?.type('b');
    await taskInputt?.press('Enter');

    await expect(firstTask).toHaveText('buy some cheeseab');
    await expect(firstInput).not.toBeInViewport();
  });
});

test.describe('유저는 리스트의 태스크들을 완료 처리하거나 완료 취소 처리한다.', () => {
  test('완료되지 않은 테스크 체크박스를 클릭하면 체크 박스가 체크되고 완료 리스트로 넘어간다. 그리고 테스크 설명선에 취소선이 생긴다', async ({
    page,
  }) => {
    await createDefaultTodos(page);

    // 완료되지 않은 테스크 체크박스를 클릭하면 체크박스가 체크되고 완료 리스트로 넘어간다.
    const inProgressSection = page.getByTestId('inProgress-section');
    const completedSection = page.getByTestId('completed-section');
    let firstCheckbox = page
      .getByRole('checkbox')
      .and(inProgressSection.getByTestId('buy some cheese'));

    await firstCheckbox.click();
    firstCheckbox = page
      .getByRole('checkbox')
      .and(completedSection.getByTestId('buy some cheese'));
    const isChecked = await firstCheckbox.isChecked();

    expect(isChecked).toBe(true);

    await expect(inProgressSection).not.toHaveText('buy some cheese');

    await expect(completedSection).toHaveText('buy some cheese');

    // 그리고 테스크 설명선에 취소선이 생긴다
    const task = completedSection.getByText('buy some cheese');
    await expect(task).toHaveClass('line-through');
  });

  test('완료된 테스크 체크박스를 클릭하면 체크가 해제되고 대기 리스트로 넘어간다.', async ({
    page,
  }) => {
    await createDefaultTodos(page);
    const inProgressSection = page.getByTestId('inProgress-section');
    const completedSection = page.getByTestId('completed-section');
    let checkbox = page
      .getByRole('checkbox')
      .and(inProgressSection.getByTestId('buy some cheese'));

    await checkbox.click();
    checkbox = page
      .getByRole('checkbox')
      .and(completedSection.getByTestId('buy some cheese'));

    // 완료된 테스크 체크박스를 클릭하면 체크가 해제되고 대기 리스트로 넘어간다.

    await checkbox.click();
    checkbox = page
      .getByRole('checkbox')
      .and(inProgressSection.getByTestId('buy some cheese'));
    const isChecked = await checkbox.isChecked();

    expect(isChecked).toBe(false);

    await expect(
      completedSection.getByText('buy some cheese')
    ).not.toBeVisible();

    await expect(inProgressSection.getByText('buy some cheese')).toBeVisible();

    // 그리고 테스크 설명선에 취소선이 사라진다.
    const task = inProgressSection.getByText('buy some cheese');
    await expect(task).not.toHaveClass('line-through');
  });
});

test.describe('유저가 테스크를 삭제한다', () => {
  test('대기 또는 완료리스트에 테스크가 있을 때 해당하는 테스크 우측 삭제 버튼을 누르면 테스크가 삭제되고, 리스트에서 없어진다', async ({
    page,
  }) => {
    await createDefaultTodos(page);
    await checkNumberOfTodosInLocalStorage(page, 3);
    // 대기 또는 완료리스트에 테스크가 있을 때 해당하는 테스크 우측 삭제 버튼을 누르면 테스크가 삭제되고 리스트에서 없어진다.
    const taskTitle = page.getByRole('textbox', { name: 'buy some cheese' });
    const task = page.getByTestId('button-buy some cheese');
    await task.click();
    await expect(taskTitle).not.toBeInViewport();
    await checkNumberOfTodosInLocalStorage(page, 2);
  });
});

test.describe('Clear All 버튼을 눌러 완료된 테스크 들을 삭제한다.', () => {
  test('완료 리스트에 완료된 테스크가 존재 할 때 Clear All 버튼을 누르면 완료 리스트에서 완료된 테스크가 모두 삭제되고 Empty란 글자가 나타난다.', async ({
    page,
  }) => {
    await createDefaultTodos(page);
    // 완료 리스트에 완료된 테스크가 존재 할 때
    const inProgressSection = page.getByTestId('inProgress-section');
    const completedSection = page.getByTestId('completed-section');
    let checkbox = page
      .getByRole('checkbox')
      .and(inProgressSection.getByTestId('buy some cheese'));

    await checkbox.click();
    checkbox = page
      .getByRole('checkbox')
      .and(completedSection.getByTestId('buy some cheese'));
    expect(checkbox).toBeInViewport();

    // Clear All 버튼을 누르면 완료 리스트에서 완료된 테스크가 모두 삭제되고

    const clearButton = page.getByRole('button', { name: 'Clear All' });
    await clearButton.click();
    expect(checkbox).not.toBeInViewport();
    const empty = completedSection.getByText('Empty');
    await expect(empty).toBeInViewport();
  });
});
