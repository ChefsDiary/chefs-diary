"use client";

import { useCallback, useMemo, useOptimistic, useState } from 'react';

import Spinner from '@/components/shared/spinner/Spinner';
import { useUserContext } from '@/context/UserContext';
import {
    IngredientGroupWithAssignedIngredientsDTO
} from '@/lib/dTOs/admin/IngredientGroupWithAssignedIngredientsDTO';
import { ActionResponseDTO } from '@/lib/dTOs/shared/ActionResponseDTO';
import { PaginatedDTO } from '@/lib/dTOs/shared/PaginatedDTO';
import PermissionTypeEnum from '@/lib/enums/PermissionTypeEnum';
import { useServerActionWithLoading } from '@/lib/hooks/apiHooks/shared/useServerActionWithLoading';
import { getPages } from '@/lib/utils/table';
import {
    Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure
} from '@heroui/react';

import IngredientGroupsBottomContent from './components/IngredientGroupsBottomContent';
import { IngredientGroupsRenderCell } from './components/IngredientGroupsRenderCell';
import IngredientGroupsTopContent from './components/IngredientGroupsTopContent';
import getIngredientGroupsColumns from './constants/ingredientGroupsColumns';
import { useIngredientGroupsTablePageSize } from './context/hooks/useIngredientGroupsTablePageSize';
import {
    useIngredientGroupsTableSortDescriptor
} from './context/hooks/useIngredientGroupsTableSortDescriptor';
import DeleteIngredientGroupModal from './modals/deleteIngredientGroupModal/deleteIngredientGroupModal/DeleteIngredientGroupModal';
import EditIngredientGroupModal from './modals/editIngredientGroupModal/EditIngredientGroupModal';
import {
    InsertIngredientGroupModal
} from './modals/InsertIngredientGroupModal/insertIngredientGroupModal/InsertIngredientGroupModal';

export type SetOptimisticIngredientGroupType = {
  type: "add" | "update" | "delete";
  ingredientGroup: IngredientGroupWithAssignedIngredientsDTO;
};

type Props = {
  serverAction: () => Promise<
    ActionResponseDTO<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>
  >;
};

export default function IngredientGroupsTable({ serverAction }: Props) {
  const { sortDescriptor, setSortDescriptor } =
    useIngredientGroupsTableSortDescriptor();
  const { pageSize } = useIngredientGroupsTablePageSize();

  // Get data
  const { isPending, data, refetch } = useServerActionWithLoading(serverAction);

  // State
  const [groupToEdit, setGroupToEdit] =
    useState<IngredientGroupWithAssignedIngredientsDTO | null>(null);
  const [groupToDelete, setGroupToDelete] =
    useState<IngredientGroupWithAssignedIngredientsDTO | null>(null);

  // Modal states
  const {
    isOpen: isOpenInsertGroup,
    onOpen: onOpenInsertGroup,
    onOpenChange: onOpenChangeInsertGroup,
  } = useDisclosure();
  const {
    isOpen: isOpenEditGroup,
    onOpen: onOpenEditGroup,
    onOpenChange: onOpenChangeEditGroup,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteGroup,
    onOpen: onOpenDeleteGroup,
    onOpenChange: onOpenChangeDeleteGroup,
  } = useDisclosure();

  // Context
  const { user } = useUserContext();

  // Constants
  const canEdit =
    user?.permissions.some(
      (item) => item === PermissionTypeEnum.INGREDIENT_EDIT
    ) ?? false;
  const canDelete =
    user?.permissions.some(
      (item) => item === PermissionTypeEnum.INGREDIENT_DELETE
    ) ?? false;
  const totalCount = data?.totalCount ?? 0;
  const items = data?.items ?? [];

  const pages = useMemo(
    () => getPages(totalCount, pageSize),

    [totalCount, pageSize]
  );

  const renderCell = useCallback(IngredientGroupsRenderCell, []);

  const getColumns = useCallback(getIngredientGroupsColumns, []);

  // Optimistic update
  const [optimisticIngredientGroups, setOptimisticIngredientGroup] =
    useOptimistic(items, (state, action: SetOptimisticIngredientGroupType) => {
      switch (action.type) {
        case "add":
          return [...state, action.ingredientGroup];
        case "update":
          return state.map((item) =>
            item.idIngredientGroup === action.ingredientGroup.idIngredientGroup
              ? { ...item, name: action.ingredientGroup.name }
              : item
          );
        case "delete":
          return state.filter(
            (item) =>
              item.idIngredientGroup !==
              action.ingredientGroup.idIngredientGroup
          );
      }
    });

  // Handlers
  const handleEditGroup = (
    group: IngredientGroupWithAssignedIngredientsDTO
  ) => {
    setGroupToEdit(group);
    onOpenEditGroup();
  };

  const handleDeleteGroup = (
    group: IngredientGroupWithAssignedIngredientsDTO
  ) => {
    setGroupToDelete(group);
    onOpenDeleteGroup();
  };

  return (
    <>
      <div className="h-full">
        <Table
          isHeaderSticky
          isStriped
          aria-label="Skupiny ingrediencí"
          topContent={
            <IngredientGroupsTopContent
              onPressInsertGroup={onOpenInsertGroup}
            />
          }
          topContentPlacement="outside"
          bottomContent={
            <IngredientGroupsBottomContent
              pages={pages}
              totalGroups={totalCount}
            />
          }
          bottomContentPlacement="outside"
          fullWidth
          className="h-full"
          classNames={{
            wrapper: "rounded-none shadow-none p-0 flex-1",
          }}
          onSortChange={setSortDescriptor}
          sortDescriptor={sortDescriptor}
        >
          <TableHeader columns={getColumns(canEdit || canDelete)}>
            {(column) => (
              <TableColumn
                key={column.key}
                align={column.align}
                allowsSorting={column.allowsSorting}
                width={column.width}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody
            items={optimisticIngredientGroups}
            isLoading={isPending}
            loadingContent={<Spinner />}
            emptyContent="Žádná skupina nebyla nalezena"
          >
            {(item) => (
              <TableRow key={item.idIngredientGroup}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(
                      item,
                      columnKey,
                      canEdit,
                      canDelete,
                      handleEditGroup,
                      handleDeleteGroup
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <InsertIngredientGroupModal
          isOpen={isOpenInsertGroup}
          onOpenChange={onOpenChangeInsertGroup}
          setOptimisticIngredientGroup={setOptimisticIngredientGroup}
          refetch={refetch}
        />

        <EditIngredientGroupModal
          group={groupToEdit as IngredientGroupWithAssignedIngredientsDTO}
          isOpen={isOpenEditGroup}
          onOpenChange={onOpenChangeEditGroup}
          setOptimisticIngredientGroup={setOptimisticIngredientGroup}
          setGroupToEdit={setGroupToEdit}
          refetch={refetch}
        />

        <DeleteIngredientGroupModal
          group={groupToDelete as IngredientGroupWithAssignedIngredientsDTO}
          isOpen={isOpenDeleteGroup}
          onOpenChange={onOpenChangeDeleteGroup}
          setOptimisticIngredientGroup={setOptimisticIngredientGroup}
          setGroupToDelete={setGroupToDelete}
          refetch={refetch}
        />
      </div>
    </>
  );
}
