import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import CenteredLoader from "~/components/loaders/centered-loader";
import { MainLayout } from "~/layouts/main.layout";
import PrivateWrapper from "~/wrappers/private.wrapper";

const HomePage = lazy(() => import("~/pages/home.page"));
const LoginPage = lazy(() => import("~/pages/login.page"));
const UserPage = lazy(() => import("~/pages/user.page"));
const TodoListsPage = lazy(() => import("~/pages/todoLists-list.page"));
const TodosListPage = lazy(() => import("~/pages/todos-list.page"));
const TodoFormPage = lazy(() => import("~/pages/todo-form.page"));
const TodoDetailPage = lazy(() => import("~/pages/todo-detail.page"));
const SettingsPage = lazy(() => import("~/pages/settings.page"));

export const appRoutes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<CenteredLoader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <PrivateWrapper />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "user/:userId",
            children: [
              {
                index: true,
                element: <UserPage />,
              },
              {
                path: "settings",
                element: <SettingsPage />,
              },
              {
                path: "todo-lists",
                children: [
                  {
                    index: true,
                    element: <TodoListsPage />,
                  },
                  {
                    path: ":todoListId/todos",
                    children: [
                      {
                        index: true,
                        element: <TodosListPage />,
                      },
                      {
                        path: "new",
                        element: <TodoFormPage />,
                      },
                      {
                        path: ":todoId/edit",
                        element: <TodoFormPage />,
                      },
                      {
                        path: ":todoId",
                        element: <TodoDetailPage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
